from datetime import datetime
from pydantic import BaseModel, Field, EmailStr

class User(BaseModel):
    user_id: int
    first_name: str
    last_name: str
    phone_number: str
    email: EmailStr
    user_password: str
    user_status: str
    created: datetime = Field(default_factory=datetime.utcnow)

class UserResponse(BaseModel):
    user_id: int
    email: EmailStr
    created: datetime = Field(default_factory=datetime.utcnow)

class UserCreateInput(BaseModel):
    first_name: str
    last_name: str
    phone_number: str
    email: EmailStr
    user_password: str