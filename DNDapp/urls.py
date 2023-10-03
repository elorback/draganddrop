from django.urls import path
from .views import TaskView  

urlpatterns = [
    #URLS for CBV's
    path('tasks/', TaskView.as_view(), name='task-list'),
    path('tasks/<int:task_id>/', TaskView.as_view(), name='details'),
]
