from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

def post_image_path(instance, filename):
    return f'posts/{instance.author.username}/{filename}'

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    image = models.ImageField(upload_to=post_image_path, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name='posts',
        null=True,  # Allow null for existing posts
        default=None  # Set default to None
    )

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']
