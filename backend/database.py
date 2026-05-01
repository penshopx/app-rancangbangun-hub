from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ.get('MONGO_URL', '')
db_name = os.environ.get('DB_NAME', 'rancangbangun')

client = None
_real_db = None

if mongo_url:
    try:
        client = AsyncIOMotorClient(mongo_url)
        _real_db = client[db_name]
    except Exception as e:
        print(f"Warning: Could not connect to MongoDB: {e}")
else:
    print("Warning: MONGO_URL not set. Database features will be unavailable.")


class NullCollection:
    """A no-op collection that silently handles all DB operations when MongoDB is unavailable."""

    async def insert_one(self, *args, **kwargs):
        return None

    async def find_one(self, *args, **kwargs):
        return None

    async def find(self, *args, **kwargs):
        return self

    def sort(self, *args, **kwargs):
        return self

    def limit(self, *args, **kwargs):
        return self

    def skip(self, *args, **kwargs):
        return self

    async def to_list(self, *args, **kwargs):
        return []

    def __aiter__(self):
        return self

    async def __anext__(self):
        raise StopAsyncIteration

    async def update_one(self, *args, **kwargs):
        return None

    async def update_many(self, *args, **kwargs):
        return None

    async def delete_one(self, *args, **kwargs):
        return None

    async def delete_many(self, *args, **kwargs):
        return None

    async def count_documents(self, *args, **kwargs):
        return 0

    async def aggregate(self, *args, **kwargs):
        return self


class NullDB:
    """A proxy database object that returns NullCollection for any attribute access."""

    def __getattr__(self, name):
        return NullCollection()

    def __getitem__(self, name):
        return NullCollection()


db = _real_db if _real_db is not None else NullDB()
