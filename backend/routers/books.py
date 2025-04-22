from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.db.database import get_db
from backend.db.models import Book
from backend.schemas.schemas import BookSchema  # Импортируем Pydantic-схему

router = APIRouter(prefix="/books", tags=["Books"])


@router.get("/", summary="Get all books", response_model=list[BookSchema])
def get_books(db: Session = Depends(get_db)):
    """Возвращает список всех книг"""
    return db.query(Book).all()


@router.get(
    "/search/",
    summary="Get a book by title and category",
    response_model=list[BookSchema],
)
def search_books(
    category: str | None = None,
    title: str | None = None,
    db: Session = Depends(get_db),
):
    """Фильтрация книг по категории и названию"""
    query = db.query(Book)

    if category:
        query = query.filter(Book.category.has(name=category))
    if title:
        query = query.filter(Book.title.ilike(f"%{title}%"))

    return query.all()


@router.get("/top", summary="Get five best books", response_model=list[BookSchema])
def get_top_books(db: Session = Depends(get_db)):
    """Возвращает топ-5 книг по рейтингу"""
    return db.query(Book).order_by(Book.rating.desc()).limit(5).all()


@router.get(
    "/best-deal",
    summary="Get the best book (highest rating & lowest price)",
    response_model=BookSchema,
)
def get_best_deal(db: Session = Depends(get_db)):
    """Возвращает книгу с самым высоким рейтингом и самой низкой ценой"""
    best_book = (
        db.query(Book)
        .order_by(
            Book.rating.desc(), Book.price.asc()
        )  # Сортируем по убыванию рейтинга и возрастанию цены
        .first()
    )
    return best_book
