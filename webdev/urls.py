
from django.contrib import admin
from django.urls import path
from mycontacts import views

urlpatterns = [
    path('admin/', admin.site.urls),  
    path('', views.show, name='show'),             
    path('add/', views.add, name='add'),
    path('edit/<int:contact_id>/', views.edit, name='edit'),
    path('delete/<int:contact_id>/', views.delete, name='delete'),
]
