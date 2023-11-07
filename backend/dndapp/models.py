from django.db import models

# Create your models here.

class Tasks(models.Model):
    name = models.CharField(max_length=50,unique=True,blank=False)
    description = models.CharField(max_length=150,blank=False)
    sorted_order = models.IntegerField(default=0)
    date_created = models.DateField(auto_now=True)
    date_updated = models.DateField(auto_now=True)
    
    def __str__(self):
        return self.name
    class Meta:
        db_table = 'Tasks'

class Comments(models.Model):
    task_comment = models.CharField(max_length=150)
    task = models.ForeignKey(Tasks, on_delete=models.CASCADE)
    task_name = models.CharField(max_length=50)
    sorted_order = models.IntegerField(default=0)
    date_created = models.DateField(auto_now=True)
    date_updated = models.DateField(auto_now=True)
    
    def __str__(self):
        return self.task_name
    class Meta:
        db_table = 'Comments'
