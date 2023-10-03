from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views import View
from .models import Tasks
from .serializers import TaskSerializer  # You'll need a serializer for JSON responses

class TaskView(View):
    def get(self, request, task_id=None):
        # Handle GET requests to retrieve tasks
        if task_id is None:
            tasks = Tasks.objects.all()
            serializer = TaskSerializer(tasks, many=True)
            return JsonResponse(serializer.data, safe=False)
        else:
            task = get_object_or_404(Tasks, pk=task_id)
            serializer = TaskSerializer(task)
            return JsonResponse(serializer.data)

    def post(self, request):
        # Handle POST requests to create a new task
        data = request.POST  # Assuming form data is sent
        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def put(self, request, task_id):
        # Handle PUT requests to update an existing task
        task = get_object_or_404(Tasks, pk=task_id)
        data = request.POST  # Assuming form data is sent
        serializer = TaskSerializer(task, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    def delete(self, request, task_id):
        # Handle DELETE requests to delete a task
        task = get_object_or_404(Tasks, pk=task_id)
        task.delete()
        return JsonResponse({'message': 'Task deleted successfully'}, status=204)
