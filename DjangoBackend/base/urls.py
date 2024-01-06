from django.urls import path
from .views import Getroutes,LoginUser,Createuser,RefreshUser,GetAllCurrentTasks,GetAllTask,GetTask

urlpatterns = [
    path('',Getroutes.as_view()),
    path('Login/',LoginUser.as_view()),
    path('Register/',Createuser.as_view()),
    path('refresh/', RefreshUser.as_view()),
    path('tasks/',GetAllCurrentTasks.as_view()),
    path('alltasks/', GetAllTask.as_view()),
    path('task/<int:pk>/',GetTask.as_view())

]