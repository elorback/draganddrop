from rest_framework import serializers
from .models import Tasks, Comments

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ['id', 'name', 'description', 'sorted_order', 'date_created', 'date_updated', 'date_deleted']

class CommentsSerializer(serializers.ModelSerializer):
    task = TaskSerializer()  # Assuming task is a ForeignKey relation to Tasks
    class Meta:
        model = Comments
        fields = ['id', 'task', 'task_comment', 'date_created', 'date_updated', 'date_deleted']
