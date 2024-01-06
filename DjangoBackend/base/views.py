from django.shortcuts import render
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView,CreateAPIView,ListCreateAPIView,ListAPIView,RetrieveAPIView
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from .serializers import LoginUserSerializer,UserSerializer,TaskSerializer,CreateTaskSerializer
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from .models import CustomUser,Task
from django.db.models import Q

# Create your views here.

class Getroutes(GenericAPIView):
    renderer_classes = [JSONRenderer]
    def get(self,request,*args,**kwargs):
        routes = {
            'home':''
        }
        return Response(routes)

class LoginUser(TokenObtainPairView):
    renderer_classes = [JSONRenderer]
    serializer_class = LoginUserSerializer
    
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        try:
            token = response.data['access']
        except:
            token = None
            return Response("authentication failed")
        
        if token is not None :
            access_token = AccessToken(token=token)
            id = access_token.payload.get("user_id")
           
            user = CustomUser.objects.get(id = id)
            response.data['username'] = user.username
            response.data['email'] = user.email
    
            return response
        
class RefreshUser(TokenRefreshView):
      renderer_classes = [JSONRenderer]
      def post(self, request, *args, **kwargs):
          response = super().post(request, *args, **kwargs)
          try :
             token = response.data['access']
          except :
              token = None
              return Response('Access Token expired')
          if token is not None:
              access_token = AccessToken(token=token)
              id = access_token.payload.get('user_id')
              user = CustomUser.objects.get(id=id)
              response.data['username'] = user.username
              response.data['email'] = user.email
              return response
        
class Createuser(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    renderer_classes = [JSONRenderer]
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            res = {
                 'status': status.HTTP_201_CREATED,
                'email': serializer.data['email'],
                'username':serializer.data['username']
            }
            return Response(res)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
class GetAllCurrentTasks(ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    renderer_classes = [JSONRenderer]
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset =  super().get_queryset()
        user = self.request.user
        startdate = self.request.GET.get('start_date')
        enddate = self.request.GET.get('end_date')
        if startdate and enddate :
            queryset = queryset.filter(date_added__range = (startdate, enddate), user= self.request.user )
        else:
            queryset = queryset.filter(user = user, is_complete = False)


        return queryset
    
    def list(self, request, *args, **kwargs):
        tasks = self.get_queryset()
        serializer = self.get_serializer(tasks, many = True)
        res = {
            'status': 'success',
            'data' : serializer.data
        }
        return Response(res)
    
    def create(self, request, *args, **kwargs):
        serializer = CreateTaskSerializer(data = request.data)
        if serializer.is_valid(raise_exception = False):
            task = serializer.save()
            task.user = request.user
            task.save()
            res = {
                'status' : status.HTTP_201_CREATED,
                'data': serializer.data
                }
            return Response(res)
        

class GetAllTask(ListAPIView):
    renderer_classes = [JSONRenderer]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
       queryset = super().get_queryset()
       queryset = queryset.filter(user = self.request.user)
       return queryset
    
    def list(self, request, *args, **kwargs):
        tasks = self.get_queryset()
        serializer = self.get_serializer(tasks, many= True)
        res = {
            'status' : 'success',
            'data' : serializer.data
        }
        return Response(res)
    

class GetTask(GenericAPIView, RetrieveModelMixin, UpdateModelMixin):
    renderer_classes = [JSONRenderer]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'
    
    def get(self,request,*args,**kwargs):
        return self.retrieve(request, *args, **kwargs)
    def put(self,request,*args,**kwargs):
        return self.update(request,*args,**kwargs)
    def retrieve(self, request, *args, **kwargs):
        task = self.get_object()
        serializer = self.get_serializer(task, many=False)
        res = {
            'status' : 'success',
            'data': serializer.data
        }
        return Response(res)
    
    def update(self, request, *args, **kwargs):
        task = self.get_object()
        serializer = self.get_serializer(task, data=request.data,  partial=True)
        
        if serializer.is_valid(raise_exception = True):
           serializer.save()
           res = {
               'status' : 'success',
               'data' : serializer.data
           }
           return Response(res)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


    

    
    




    

        
        
            





    

