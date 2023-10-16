from django.urls import path
from .views import TaskView, CommentView

urlpatterns = [
    path('api/addTask', TaskView.as_view(), name='addTask'),
    path('api/addComment', CommentView.as_view(), name='addComment'),
]
