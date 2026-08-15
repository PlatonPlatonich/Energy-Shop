
from pydantic import BaseModel, Field
from decimal import Decimal

class ProductBase(BaseModel):
    name: str = Field(
        min_length=1,
        max_length=100
    )
    brand: str = Field(
        min_length=1,
        max_length=50
    )
    flavor: str | None = Field(
        default=None,
        max_length=100
    )
    volume_ml: int = Field(
        gt=0
    )
    price: Decimal = Field(
        gt=0
    )
    stock: int = Field(
        default=0,
        ge=0
    )
    description: str | None = Field(
        default=None,
        max_length=2000
    )
    image_url: str | None = Field(
        default=None,
        max_length=500
    )


class ProductCreate(ProductBase):
    pass


class ProductResponse(ProductBase):
    id: int

    class Config:
        from_attributes = True

class ProductUpdate(BaseModel):
    name: str | None = None
    brand: str | None = None
    flavor: str | None = None
    volume_ml: int | None = None
    price: Decimal | None = None
    stock: int | None = None
    description: str | None = None
    image_url: str | None = None