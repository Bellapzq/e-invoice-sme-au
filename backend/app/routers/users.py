from fastapi import APIRouter, status, HTTPException

from app.database import database
from app.schema.user import User, UserResponse, UserCreateInput

__all__ = ("router",)

router = APIRouter(
    prefix="/users",
    tags=["user"]
)

@router.get(
    "",
    description="Get all users",
    response_model=list[User],
    status_code=status.HTTP_200_OK
)
async def list_users() -> list[User]:
    return [
        User(
            user_id=user["user_id"],
            first_name=user["first_name"],
            last_name=user["last_name"],
            phone_number=user["phone_number"],
            email=user["email"],
            user_password=user["user_password"],
            user_status=user["user_status"],
            created=user["created"]
        )
        for user in database.users.values()
    ]

@router.get(
    "/{user_id}",
    description="Get user",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK
)
async def get_users(user_id: int) -> UserResponse:
    if user_id not in database.users:
        raise HTTPException(
            detail="User not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    user = database.users[user_id]
    return UserResponse(
        user_id=user["user_id"],
        email=user["email"],
        created=user["created"]
    )

@router.post(
    "",
    description="Create a user",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
async def create_user(input_user: UserCreateInput) -> User:
    user = User(
        user_id=len(database.users)+1,
        first_name=input_user.first_name,
        last_name=input_user.last_name,
        phone_number=input_user.phone_number,
        email=input_user.email,
        user_password=input_user.user_password,
        user_status="NULL"
    )
    database.users[user.user_id] = {
        "user_id": user.user_id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "phone_number": user.phone_number,
        "email": user.email,
        "user_password": user.user_password,
        "user_status": user.user_status,
        "created": user.created
    }
    return UserResponse(
        user_id=user["user_id"],
        email=user["email"],
        created=user["created"]
    )

@router.patch(
        "/{user_id}",
        description="Update a user",
        response_model=UserResponse,
        status_code=status.HTTP_200_OK
)
async def update_user(user_id: int, input_user: UserCreateInput) -> User:
    if user_id not in database.users:
       raise HTTPException(
            detail="User not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    user = database.users[user_id]
    user["first_name"] = input_user.first_name
    user["last_name"] = input_user.last_name
    user["phone_number"] = input_user.phone_number
    user["email"] = input_user.email
    user["user_password"] = input_user.user_password
    return UserResponse(
        user_id=user["user_id"],
        email=user["email"],
        created=user["created"]
    )

@router.delete(
        "/{user_id}",
        description="Delete a post",
        status_code=status.HTTP_204_NO_CONTENT
)
async def delete_user(user_id: int) -> None:
    if user_id not in database.users:
       return
    database.users.pop(user_id)
    return None