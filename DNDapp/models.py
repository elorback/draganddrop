from django.db import models

#task model with corresponding field names 
class Tasks(models.Model):
    name = models.CharField(blank=False, max_length=50)
    description = models.CharField(blank=False, max_length=150)
    order = models.IntegerField(default=0)
    date_created = models.DateTimeField( auto_now_add=True)
    date_updated = models.DateTimeField( auto_now_add=True)
    date_deleted = models.DateTimeField( auto_now_add=True)
    
    class Meta:
        db_table = 'Tasks' #creates naming the table
    def __str__(self):
        return self.name
    
    
#comments model in databse tables
class Comments(models.Model):
    task_comment = models.TextField(blank=True)
    task_id = models.ForeignKey(Tasks, on_delete=models.CASCADE)
    date_created = models.DateTimeField( auto_now_add=True)
    date_updated = models.DateTimeField( auto_now_add=True)
    date_deleted = models.DateTimeField( auto_now_add=True)
    
    class Meta:
        db_table="Comments" #naming the table comments
    def __str__(self):
        return self.task_comment
    
    