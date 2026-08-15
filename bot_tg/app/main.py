from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import engine
from app.db.base import Base

# Эта строчка создаст таблицы в PostgreSQL (если они еще не созданы)
Base.metadata.create_all(bind=engine)

from app.api.products import router as products_router
from app.api.cart import router as cart_router
from app.api.auth import router as auth_router

app = FastAPI(
    title="Energy Shop API",
    version="1.0.0",
    description="Backend интернет-магазина зарубежных энергетиков"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(products_router)


@app.get("/")
async def root():
    return {
        "message": "Energy Shop API is running!"
    }
app.include_router(cart_router)
app.include_router(auth_router)