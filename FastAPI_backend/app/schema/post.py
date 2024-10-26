from datetime import datetime
from pydantic import BaseModel, Field

from app.schema.user import User, UserResponse

class Post(BaseModel):
    post_id: int
    title: str
    created: datetime = Field(default_factory=datetime.utcnow)
    user: User

class PostResponse(BaseModel):
    post_id: int
    title: str
    created: datetime = Field(default_factory=datetime.utcnow)
    user: UserResponse

class PostCreateInput(BaseModel):
    title: str
    user_id: int

class PostUpdateInput(BaseModel):
    title: str     

class PostFileResponse(BaseModel):
    title: str
    first_100_content: str
    validresult: str
    created: datetime = Field(default_factory=datetime.utcnow)