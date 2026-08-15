from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.services.cart_service import cart_service
from app.db.database import get_db
from app.schemas import cart_schema
from app.core.security import get_current_user
from app.models.user import User

router = APIRouter(prefix="/cart", tags=["Cart"])

class UpdateQuantityRequest(BaseModel):
    quantity: int

@router.post("/")
def add_to_cart(
    cart_item: cart_schema.CartItemCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return cart_service.add_to_cart(db, current_user.id, cart_item.product_id, cart_item.quantity)

@router.get("/")
def get_cart(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return cart_service.get_cart(db, current_user.id)

@router.put("/{item_id}")
def update_cart_quantity(
    item_id: int,
    request: UpdateQuantityRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    updated_item = cart_service.update_quantity(db, item_id, request.quantity)
    if not updated_item:
        raise HTTPException(status_code=404, detail="Item in cart not found")
    return updated_item

@router.delete("/{item_id}")
def delete_cart_item(
    item_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not cart_service.delete_cart_item(db, item_id):
        raise HTTPException(status_code=404, detail="Item in cart not found")
    return {"message": "Item removed from cart"}