from rest_framework import serializers
from .models import Tasks,Comments

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ('id', 'task_comment', 'task_id', 'date_created', 'date_updated', 'date_deleted')