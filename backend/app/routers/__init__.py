from .heartbeat import router as heartbeat_router
from .posts import router as posts_router
from .users import router as users_router

__all__ = ("heartbeat_router", "posts_router", "users_router",)

routers = (heartbeat_router, posts_router, users_router,)