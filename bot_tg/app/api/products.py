from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.product import ProductCreate, ProductResponse, ProductUpdate
from app.services import product_service


router = APIRouter(
    prefix="/products",
    tags=["Products"]
)

@router.get(
    "/",
    response_model=list[ProductResponse]
)
def get_products(
    db: Session = Depends(get_db)
):
    return product_service.get_products(db)


@router.get(
    "/{product_id}",
    response_model=ProductResponse
)
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = product_service.get_product(
        db,
        product_id
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product


@router.post(
    "/",
    response_model=ProductResponse
)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    return product_service.create_product(
        db,
        product
    )


@router.delete(
    "/{product_id}"
)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = product_service.delete_product(
        db,
        product_id
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return {
        "message": "Product deleted"
    }
@router.put(
    "/{product_id}",
    response_model=ProductResponse
)
def update_product(
    product_id: int,
    product: ProductUpdate,
    db: Session = Depends(get_db)
):
    updated_product = product_service.update_product(
        db,
        product_id,
        product
    )

    if not updated_product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return updated_product