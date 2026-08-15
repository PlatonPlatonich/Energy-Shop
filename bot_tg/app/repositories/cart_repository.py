from sqlalchemy.orm import Session
from app.models.cart import Cart


class CartRepository:
    def get_cart(self, db: Session, user_id: int):
        return db.query(Cart).filter(Cart.user_id == user_id).all()

    def add_to_cart(self, db: Session, user_id: int, product_id: int, quantity: int):
        existing_item = db.query(Cart).filter(
            Cart.user_id == user_id,
            Cart.product_id == product_id
        ).first()

        if existing_item:
            existing_item.quantity += quantity
        else:
            new_item = Cart(user_id=user_id, product_id=product_id, quantity=quantity)
            db.add(new_item)
            existing_item = new_item

        db.commit()
        db.refresh(existing_item)
        return existing_item

    def update_quantity(self, db: Session, cart_item_id: int, quantity: int):
        item = db.query(Cart).filter(Cart.id == cart_item_id).first()
        if item:
            item.quantity = quantity
            db.commit()
            db.refresh(item)
        return item

    def delete_cart_item(self, db: Session, cart_item_id: int):
        item = db.query(Cart).filter(Cart.id == cart_item_id).first()
        if item:
            db.delete(item)
            db.commit()
            return True
        return False