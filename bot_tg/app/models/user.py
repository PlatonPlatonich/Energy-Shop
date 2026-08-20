from __future__ import annotations
from typing import TYPE_CHECKING

from datetime import datetime, date

from sqlalchemy import String, DateTime, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.cart import Cart


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    birth_date: Mapped[date | None] = mapped_column(
        Date,
        nullable=False
    )
    phone_number: Mapped[str | None] = mapped_column(String(20), nullable=True)

    carts: Mapped[list["Cart"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan"
    )