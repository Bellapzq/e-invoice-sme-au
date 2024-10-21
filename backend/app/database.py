from dataclasses import dataclass, field
from datetime import datetime
import random

__all__ = ("database",)

@dataclass
class Database:
    posts: dict = field(default_factory=dict)
    users: dict = field(default_factory=dict)

    def __post_init__(self):
        self.users = {
            1: {
                "user_id": 1,
                "first_name": "Xiaofei",
                "last_name": "Yuan",
                "phone_number": "0411222333",
                "email": "xiaofei.yuan@student.unsw.edu.au",
                "user_password": "mypassword123",
                "user_status": "admin",
                "created": datetime.utcnow(),
            },
            **{
                user_id: {
                    "user_id": user_id,
                    "first_name": "XXX",
                    "last_name": "XXX",
                    "phone_number": "0411111111",
                    "email": f"user_{user_id}@example.com",
                    "user_password": "XXXXXXXXX",
                    "user_status": "NULL",
                    "created": datetime.utcnow(),
                }
                for user_id in range(2, 4)
            }
        }
        self.posts = {
            post_id: {
                "post_id": post_id,
                "title": f"9900W19CCtrl+Alt+Elite {post_id}",
                "created": datetime.utcnow(),
                "user_id": random.choice(list(self.users.keys()))
            }
            for post_id in range(1, 6)
        }

database = Database()
