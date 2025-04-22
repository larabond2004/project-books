import os
import csv
import traceback
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Импортируем только необходимые вещи
from backend.db.database import engine
from backend.db.models import Book, Category

# Загружаем переменные окружения
load_dotenv()

# Создаем сессию
SessionLocal = sessionmaker(bind=engine)
session = SessionLocal()

# Определяем путь к CSV
CSV_PATH = os.path.join(os.path.dirname(__file__), "..", "selenium", "books.csv")


def get_or_create_category(name: str):
    """Создает категорию, если ее нет, и возвращает её ID"""
    category = session.query(Category).filter_by(name=name).first()
    if not category:
        category = Category(name=name)
        session.add(category)
        session.commit()
    return category.id


# Загружаем данные из CSV
try:
    with open(CSV_PATH, newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        books = []
        for row in reader:
            category_id = get_or_create_category(row["Category"])
            book = Book(
                title=row["Title"],
                price=float(row["Price"]),
                rating=int(float(row["Rating"])),
                image_url=row["Image URL"],
                book_url=row["Book URL"],
                category_id=category_id,
            )
            print(book.title, book.book_url)
            books.append(book)

        session.bulk_save_objects(books)  # Оптимизированная вставка
        session.commit()
        print("✅ Данные успешно загружены!")

except Exception as e:
    session.rollback()
    print(f"❌ Ошибка при добавлении данных: {e}")
    traceback.print_exc()  # Выведет полный стек ошибки

finally:
    session.close()
