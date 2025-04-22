from pydantic import BaseModel, EmailStr

class BookSchema(BaseModel):
    id: int
    title: str
    price: float
    rating: int
    image_url: str
    book_url: str
    category_id: int

    class Config:
        from_attributes = True


class CartItemSchema(BaseModel):
    id: int
    user_id: int
    book_id: int
    quantity: int
    book: BookSchema

    class Config:
        from_attributes = True


class CartUpdateSchema(BaseModel):
    quantity: int


class CartTotalSchema(BaseModel):
    total_price: float


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        from_attributes = True
