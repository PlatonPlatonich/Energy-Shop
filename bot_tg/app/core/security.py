from datetime import datetime, timedelta, timezone
from typing import Annotated
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
import bcrypt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.config import settings
from app.db.database import get_db
from app.models.user import User

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 10080

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def verify_password(plain_password: str, hashed_password: str):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_password_hash(password: str):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})

    if "sub" in to_encode:
        to_encode["sub"] = str(to_encode["sub"])
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    print(f"🔑 КЛЮЧ СЕРВЕРА: '{SECRET_KEY}'")
    print(f"----- СЫРОЙ ТОКЕН ИЗ БРАУЗЕРА -----\n{token}\n----------------------------------")

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id_str = payload.get("sub")
        if user_id_str is None:
            raise credentials_exception
        user_id = int(user_id_str)
    except ExpiredSignatureError:
        print(f"❌ ОШИБКА: Срок действия токена ИСТЕК. Пожалуйста, выйдите и войдите заново.")
        raise credentials_exception
    except InvalidTokenError:
        print(f"❌ ОШИБКА: Не удалось декодировать токен (неверный ключ или поврежден).")
        raise credentials_exception

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        print(f"❌ ОШИБКА: Пользователь с ID {user_id} не найден в базе данных!")
        raise credentials_exception
    return user