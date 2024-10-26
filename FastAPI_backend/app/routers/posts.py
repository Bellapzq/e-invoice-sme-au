from fastapi import APIRouter, status, HTTPException, File, UploadFile, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.schema.post import PostFileResponse
from app.schema.user import UserResponse
import jwt
from base64 import b64encode
# from app.schema.post import Post, PostFileResponse
# from app.schema.user import User, UserResponse
# from app.schema.post import Post, PostCreateInput, PostUpdateInput, PostResponse, PostFileResponse

SECRET_KEY = "mySuperSecretKey123!"
# Test JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJCZWxsYUBleGFtcGxlLmNvbSIsInN0YXR1cyI6ImFkbWluIiwiaWF0IjoxNzI5ODgwMzU3fQ.FVDmK47wts0ej7IxImtfz-JUwWLfeIkwnj1VW9mBTWc

security = HTTPBearer()

# 验证 JWT token 的函数
def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        # 解码 token
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload  # 返回解码后的 token 数据
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")  # 处理 token 过期错误
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")  # 处理无效 token 错误

__all__ = ("router",)

router = APIRouter(
    prefix="/posts",
    tags=["post"]
)

# @router.get(
#         "",
#         description="Get all posts",
#         response_model=list[Post],
#         status_code=status.HTTP_200_OK
# )
# async def list_posts(user_info: dict = Depends(verify_token)) -> list[Post]:
#     user_id = user_info["id"]
#     email = user_info["email"]
#     user_status = user_info["status"]

#     return [
#         Post(
#             post_id=post["post_id"],
#             title=post["title"],
#             created=post["created"],
#             user=User(
#                 user_id=user_id,
#                 email=email,
#                 user_status=user_status,
#                 created=post["created"]
#             )
#         )
#         for post in database.posts.values()
#     ]
    
@router.post(
    "/upload", 
    description="Upload a file (our invoice) and valid it, always return true response",
    status_code=status.HTTP_200_OK
)
async def upload(user_info: dict = Depends(verify_token), file: UploadFile = File(...)) -> PostFileResponse:
    try:
        # 从JWT token中获取用户信息
        user_id = user_info["id"]
        email = user_info["email"]
        user_status = user_info["status"]

        # 读取文件内容
        contents = await file.read()

        # 将文件的前100个字节转换为Base64编码
        first_100_content = b64encode(contents[:100]).decode('utf-8')

        # 响应中包含文件名，前100个字节的内容以及用户信息
        return PostFileResponse(
            title=f"Successfully read the contents of {file.filename}",
            first_100_content=first_100_content,
            validresult="True",
            user_info={
                "id": user_id,
                "email": email,
                "status": user_status
            }
        )
    except Exception as e:
        return {"message": f"There was an error uploading the file: {str(e)}"}
    finally:
        await file.close()

# @router.get(
#         "/{post_id}",
#         description="Get post",
#         response_model=PostResponse,
#         status_code=status.HTTP_200_OK
# )
# async def get_posts(post_id: int) -> PostResponse:
#     if post_id not in database.posts:
#         raise HTTPException(
#             detail="Post not found",
#             status_code=status.HTTP_404_NOT_FOUND
#         )
#     post = database.posts[post_id]
#     return PostResponse(
#             post_id=post["post_id"],
#             title=post["title"],
#             created=post["created"],
#             user=UserResponse(
#                 user_id=post["user_id"],
#                 email=database.users[post["user_id"]]["email"],
#                 created=database.users[post["user_id"]]["created"]
#             )
#         )

# @router.post(
#         "",
#         description="Create a post",
#         response_model=Post,
#         status_code=status.HTTP_201_CREATED
# )
# async def create_post(input_post: PostCreateInput) -> Post:
#     if input_post.user_id not in database.users:
#         raise HTTPException(
#             detail="User not found",
#             status_code=status.HTTP_422_UNPROCESSABLE_ENTITY
#         )
#     post = Post(
#         post_id=len(database.posts)+1,
#         title=input_post.title,
#         user=User(
#             user_id=input_post.user_id,
#             first_name=database.users[input_post.user_id]["first_name"],
#             last_name=database.users[input_post.user_id]["last_name"],
#             phone_number=database.users[input_post.user_id]["phone_number"],
#             email=database.users[input_post.user_id]["email"],
#             user_password=database.users[input_post.user_id]["user_password"],
#             user_status=database.users[input_post.user_id]["user_status"],
#             created=database.users[input_post.user_id]["created"]
#         )
#     )
#     database.posts[post.post_id] = {
#         "post_id": post.post_id,
#         "title": post.title,
#         "created": post.created,
#         "user_id": post.user.user_id
#     }
#     return post

# @router.patch(
#         "/{post_id}",
#         description="Update a post",
#         response_model=PostResponse,
#         status_code=status.HTTP_200_OK
# )
# async def update_post(post_id: int, input_post: PostUpdateInput) -> Post:
#     if post_id not in database.posts:
#        raise HTTPException(
#             detail="Post not found",
#             status_code=status.HTTP_404_NOT_FOUND
#         )
#     post = database.posts[post_id]
#     post["title"] = input_post.title
#     return PostResponse(
#         post_id=post["post_id"],
#         title=post["title"],
#         created=post["created"],
#         user=UserResponse(
#             user_id=post["user_id"],
#             email=database.users[post["user_id"]]["email"],
#             created=database.users[post["user_id"]]["created"]
#         )
#     )

# @router.delete(
#         "/{post_id}",
#         description="Delete a post",
#         status_code=status.HTTP_204_NO_CONTENT
# )
# async def delete_post(post_id: int) -> None:
#     if post_id not in database.posts:
#        return
#     database.posts.pop(post_id)
#     return None
