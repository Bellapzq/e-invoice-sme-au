from fastapi import APIRouter, status, HTTPException, File, UploadFile

from app.database import database
from app.schema.post import Post, PostCreateInput, PostUpdateInput, PostResponse, PostFileResponse
from app.schema.user import User, UserResponse

__all__ = ("router",)

router = APIRouter(
    prefix="/posts",
    tags=["post"]
)

@router.get(
        "",
        description="Get all posts",
        response_model=list[Post],
        status_code=status.HTTP_200_OK
)
async def list_posts() -> list[Post]:
    return [
        Post(
            post_id=post["post_id"],
            title=post["title"],
            created=post["created"],
            user=User(
                user_id=post["user_id"],
                first_name=database.users[post["user_id"]]["first_name"],
                last_name=database.users[post["user_id"]]["last_name"],
                phone_number=database.users[post["user_id"]]["phone_number"],
                email=database.users[post["user_id"]]["email"],
                user_password=database.users[post["user_id"]]["user_password"],
                user_status=database.users[post["user_id"]]["user_status"],
                created=database.users[post["user_id"]]["created"]
            )
        )
        for post in database.posts.values()
    ]

@router.get(
        "/{post_id}",
        description="Get post",
        response_model=PostResponse,
        status_code=status.HTTP_200_OK
)
async def get_posts(post_id: int) -> PostResponse:
    if post_id not in database.posts:
        raise HTTPException(
            detail="Post not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    post = database.posts[post_id]
    return PostResponse(
            post_id=post["post_id"],
            title=post["title"],
            created=post["created"],
            user=UserResponse(
                user_id=post["user_id"],
                email=database.users[post["user_id"]]["email"],
                created=database.users[post["user_id"]]["created"]
            )
        )

@router.post(
        "",
        description="Create a post",
        response_model=Post,
        status_code=status.HTTP_201_CREATED
)
async def create_post(input_post: PostCreateInput) -> Post:
    if input_post.user_id not in database.users:
        raise HTTPException(
            detail="User not found",
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY
        )
    post = Post(
        post_id=len(database.posts)+1,
        title=input_post.title,
        user=User(
            user_id=input_post.user_id,
            first_name=database.users[input_post.user_id]["first_name"],
            last_name=database.users[input_post.user_id]["last_name"],
            phone_number=database.users[input_post.user_id]["phone_number"],
            email=database.users[input_post.user_id]["email"],
            user_password=database.users[input_post.user_id]["user_password"],
            user_status=database.users[input_post.user_id]["user_status"],
            created=database.users[input_post.user_id]["created"]
        )
    )
    database.posts[post.post_id] = {
        "post_id": post.post_id,
        "title": post.title,
        "created": post.created,
        "user_id": post.user.user_id
    }
    return post

@router.patch(
        "/{post_id}",
        description="Update a post",
        response_model=PostResponse,
        status_code=status.HTTP_200_OK
)
async def update_post(post_id: int, input_post: PostUpdateInput) -> Post:
    if post_id not in database.posts:
       raise HTTPException(
            detail="Post not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    post = database.posts[post_id]
    post["title"] = input_post.title
    return PostResponse(
        post_id=post["post_id"],
        title=post["title"],
        created=post["created"],
        user=UserResponse(
            user_id=post["user_id"],
            email=database.users[post["user_id"]]["email"],
            created=database.users[post["user_id"]]["created"]
        )
    )

@router.delete(
        "/{post_id}",
        description="Delete a post",
        status_code=status.HTTP_204_NO_CONTENT
)
async def delete_post(post_id: int) -> None:
    if post_id not in database.posts:
       return
    database.posts.pop(post_id)
    return None

@router.post(
        "/upload",
        description="Upload a file (our invoice) and valid it, always return true response",
        status_code=status.HTTP_200_OK
)
async def upload(user_id: int, file: UploadFile = File(...)) -> PostFileResponse:
    if user_id not in database.users:
        raise HTTPException(
            detail="User not found",
            status_code=status.HTTP_404_NOT_FOUND
        )
    try:
        contents = await file.read()
        return PostFileResponse(
            title=f"Successfully read the contents of {file.filename}",
            first_100_content=contents[:100],
            validresult="True"
        )
    except Exception as e:
        error_message = f"There was an error uploading the file: {str(e)}"
        return {"message": error_message}
    finally:
        await file.close()