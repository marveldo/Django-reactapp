from rest_framework import serializers
from rest_framework.fields import empty
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CustomUser,Task


class LoginUserSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required =True)
    default_error_messages = {
       'no_active_account': 'Your account is not active',
        'Invalid_Credentials': 'Your Login failed',
        'no_admin_account': 'account doesnt have admin access'
    }

class TaskSerializer(serializers.ModelSerializer):
     class Meta:
          model = Task
          exclude = ['user']

     def __init__(self, *args, **kwargs):
         super(TaskSerializer,self).__init__(*args , **kwargs)
         for fieldname, field in self.fields.items():
              field.required = False

class UserSerializer(serializers.ModelSerializer):
     class Meta:
          model = CustomUser
          fields = ['email','username','password']
          

     def create(self, validated_data):
          user = CustomUser(
               email = validated_data['email'],
               username = validated_data['username']
             )
          
          user.set_password(validated_data['password'])
          user.is_active = True
          user.save()
          return user

class CreateTaskSerializer(serializers.ModelSerializer):
     class Meta:
          model = Task
          exclude = ['user', 'is_complete']



