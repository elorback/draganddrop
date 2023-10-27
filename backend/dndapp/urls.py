from django.urls import path
from .views import GeneralTaskView,GetSingleTaskView, CommentView

urlpatterns = [
    path('api/addTask/', GeneralTaskView.as_view(), name='addTask'),
    path('api/tasks/', GeneralTaskView.as_view(), name='getAllTasks'),
    path('api/tasks/<int>:pk/', GetSingleTaskView.as_view(), name='getSingleTask'),
    path('api/addComment/', CommentView.as_view(), name='addComment'),
]
