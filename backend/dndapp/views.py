from rest_framework import generics
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
  
class CommentsforTaskView(generics.ListAPIView):
    serializer_class =CommentsSerializer
    
    def get_queryset(self):
        order = self.kwargs['pk']
        return Comments.objects.filter(sorted_order=order)
    
    def get_comments(self,request,*args, **kwargs):
        instance = self.get_queryset()  # Retrieve the comments
        serializer = self.get_serializer(instance)
        serializer.is_valid(raise_exception=True)
        print(serializer.data)
        return Response(serializer.data)
