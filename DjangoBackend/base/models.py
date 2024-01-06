from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager
# Create your models here.

class CustomUserManager(BaseUserManager):
    
    def create_user(self, email,password,**other_fields):
        if not email:
            raise ValueError(("Email must be provided"))
        
        email = self.normalize_email(email)
        user = self.model(email=email,**other_fields)
        user.set_password(password)
        user.save()
        return user
 

    def create_superuser(self,email,password,**other_fields):
        other_fields.setdefault("is_staff", True)
        other_fields.setdefault("isAdmin",True)
        other_fields.setdefault("is_active",True)
        other_fields.setdefault("is_superuser",True)

        if other_fields.get("is_staff") is not True:
            raise ValueError(("Superuser must have is_staff=True."))
        if other_fields.get("is_superuser") is not True:
            raise ValueError(("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **other_fields)
    

class CustomUser(AbstractUser):


    name= models.CharField(max_length=200)
    username = models.CharField(max_length=200, null=True)
    email =models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    isAdmin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)


    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [username]

    objects = CustomUserManager()


    def __str__(self):
        return self.email
    


class Task (models.Model):
    user = models.ForeignKey(CustomUser, null=True, blank = True, on_delete = models.CASCADE)
    name = models.CharField(max_length = 120 , blank=True ,null=True)
    description = models.TextField(blank=True, null=True)
    is_complete = models.BooleanField(default = False , blank =True ,null = True)
    date_added = models.DateField(auto_now_add = True)

    def __str__(self) :
        return self.name