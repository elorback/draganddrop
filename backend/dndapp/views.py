from rest_framework import generics,serializers
from rest_framework import status
from rest_framework.response import Response
from .models import Tasks, Comments
from .serializers import TaskSerializer, CommentsSerializer


class GeneralTaskView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    queryset = Tasks.objects.all()

class GetSingleTaskView(generics.RetrieveAPIView):
    serializer_class = TaskSerializer
    queryset = TaskSerializer


class CommentView(generics.ListCreateAPIView):
    serializer_class = CommentsSerializer
    queryset =Comments.objects.all()
