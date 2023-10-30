from rest_framework import generics,serializers
from rest_framework import status
from rest_framework.response import Response
from .models import Tasks, Comments
from .serializers import TaskSerializer, CommentsSerializer


class GeneralTaskView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    queryset = Tasks.objects.all()

class GetSingleTaskView(generics.RetrieveUpdateAPIView):
    serializer_class = TaskSerializer
    queryset = Tasks.objects.all()

    def put(self, request, *args, **kwargs):
        instance = self.get_object()  # Retrieve the task
        serializer = self.get_serializer(instance, data=request.data, partial=True)  # Partial update
        serializer.is_valid(raise_exception=True)
        serializer.save()  # Save the updated task
        return Response(serializer.data)


class CommentView(generics.ListCreateAPIView):
    serializer_class = CommentsSerializer
    queryset =Comments.objects.all()
