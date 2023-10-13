from rest_framework import serializers
from .models import Tasks,Comments

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ['id','name','description', 'date_created', 'date_updated', 'date_deleted']

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['id', 'task_comment', 'task_id', 'date_created', 'date_updated', 'date_deleted']