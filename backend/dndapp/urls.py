from django.urls import path
from .views import TaskView, CommentView

urlpatterns = [
    path('api/createTask', TaskView.as_view(), name='createTask'),
    path('api/createComments', CommentView.as_view(), name='comment-list'),
]
