from sqlalchemy import String, Integer, Numeric, Text
from sqlalchemy.orm import Mapped, mapped_column
from decimal import Decimal
from app.db.base import Base


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    brand: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    flavor: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    volume_ml: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False
    )

    stock: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    image_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True
    )