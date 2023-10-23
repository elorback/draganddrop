from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from .models import Tasks, Comments
from .serializers import TaskSerializer, CommentsSerializer

class TaskView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Tasks.objects.all()
    
    def list(self,request,*args,**kwargs):
        q_set = self.get_queryset()
        serializer = TaskSerializer(q_set,many=True)
        jsondata = [data for data in serializer.data]
        print(serializer.data)        
        return Response(serializer.data)
        
    def post(self, request, *args, **kwargs):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            task = serializer.save()
            return Response(TaskSerializer(task).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentView(generics.ListCreateAPIView):
    serializer_class = CommentsSerializer

    def get_queryset(self):
        return Comments.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = CommentsSerializer(data=request.data)
        if serializer.is_valid():
            comment = serializer.save()
            return Response(CommentsSerializer(comment).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
