from app.repositories.cart_repository import CartRepository
from sqlalchemy.orm import Session


class CartService:
    def get_cart(self, db: Session, user_id: int):

        return CartRepository().get_cart(db, user_id)

    def add_to_cart(self, db: Session, user_id: int, product_id: int, quantity: int):

        return CartRepository().add_to_cart(db, user_id, product_id, quantity)

    def update_quantity(self, db: Session, cart_item_id: int, quantity: int):
        return CartRepository().update_quantity(db, cart_item_id, quantity)

    def delete_cart_item(self, db: Session, cart_item_id: int):
        return CartRepository().delete_cart_item(db, cart_item_id)


cart_service = CartService()