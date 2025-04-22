from backend.db.database import Base, engine
from backend.db.models import Book, Category

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

Base.metadata.create_all(bind=engine)  # Создаем таблицы
print("✅ Таблицы созданы!")
