from rest_framework import serializers
from .models import Tasks, Comments

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ['name', 'description', 'sorted_order', 'date_created', 'date_updated']

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = [ 'task_comment', 'task_name','task','sorted_order', 'date_created', 'date_updated']
