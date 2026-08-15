from sqlalchemy.orm import Session

from app.repositories import product_repository
from app.schemas.product import ProductCreate, ProductUpdate


def get_products(db: Session):
    return product_repository.get_products(db)


def get_product(
    db: Session,
    product_id: int
):
    return product_repository.get_product_by_id(
        db,
        product_id
    )


def create_product(
    db: Session,
    product: ProductCreate
):
    return product_repository.create_product(
        db,
        product
    )


def delete_product(
    db: Session,
    product_id: int
):
    return product_repository.delete_product(
        db,
        product_id
    )
def update_product(
    db: Session,
    product_id: int,
    product: ProductUpdate
):
    return product_repository.update_product(
        db,
        product_id,
        product
    )