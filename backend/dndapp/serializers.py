from rest_framework import serializers
from .models import Tasks, Comments

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ['strID', 'name', 'description', 'sorted_order', 'date_created', 'date_updated']

class CommentsSerializer(serializers.ModelSerializer):
    task = TaskSerializer()  
    class Meta:
        model = Comments
        fields = ['strID', 'task', 'task_comment', 'date_created', 'date_updated']
