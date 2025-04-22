from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.db.database import get_db
from backend.db.models import CartItem, Book
from backend.auth.auth import get_current_user
from backend.schemas.schemas import CartItemSchema, CartUpdateSchema, CartTotalSchema

router = APIRouter(prefix="/cart", tags=["Cart"])


@router.get("/", summary="Get user cart", response_model=list[CartItemSchema])
def get_cart(user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    """Получает содержимое корзины пользователя"""
    return db.query(CartItem).join(Book).filter(CartItem.user_id == user_id).all()


@router.post("/{book_id}", summary="Add book to cart")
def add_to_cart(
    book_id: int, user_id: int = Depends(get_current_user), db: Session = Depends(get_db)
):
    """Добавляет книгу в корзину"""
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    cart_item = db.query(CartItem).filter_by(user_id=user_id, book_id=book_id).first()
    if cart_item:
        cart_item.quantity += 1
    else:
        cart_item = CartItem(user_id=user_id, book_id=book_id, quantity=1)
        db.add(cart_item)

    db.commit()
    return {"message": "Book added to cart"}


@router.put("/{book_id}", summary="Update quantity in cart")
def update_cart_quantity(
    book_id: int, update: CartUpdateSchema, user_id: int = Depends(get_current_user), db: Session = Depends(get_db)
):
    """Изменяет количество книги в корзине"""
    cart_item = db.query(CartItem).filter_by(user_id=user_id, book_id=book_id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Book not in cart")

    if update.quantity < 1:
        db.delete(cart_item)  # Удаляем, если количество 0
    else:
        cart_item.quantity = update.quantity

    db.commit()
    return {"message": "Quantity updated", "quantity": cart_item.quantity}


@router.delete("/{book_id}", summary="Remove book from cart")
def remove_from_cart(
    book_id: int, user_id: int = Depends(get_current_user), db: Session = Depends(get_db)
):
    """Удаляет книгу из корзины"""
    cart_item = db.query(CartItem).filter_by(user_id=user_id, book_id=book_id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Book not in cart")

    db.delete(cart_item)
    db.commit()
    return {"message": "Book removed from cart"}


@router.get("/total_price", summary="Get total cart price", response_model=CartTotalSchema)
def get_cart_total_price(user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    """Возвращает общую стоимость товаров в корзине"""
    total_price = (
        db.query(CartItem)
        .filter(CartItem.user_id == user_id)
        .join(Book)
        .with_entities((CartItem.quantity * Book.price).label("total"))
    )

    total = sum(item.total for item in total_price)
    return {"total_price": total}
