from django.urls import path
from django.contrib import admin
from django.conf.urls import include

from . import views

urlpatterns = [
    path('', views.tracerList.as_view()),

    path('check/', views.checkPattern.as_view()),
    
    path('saveTrack/', views.saveTrackList.as_view()),
    
    path('deleteCategory/', views.deleteCategory.as_view()),
    path('updateCategory/', views.updateCategory.as_view()),
    path('addCategory/', views.addCategory.as_view()),
    
    
    path('addPattern/', views.addPattern.as_view()),
    path('deletePattern/', views.deletePattern.as_view()),
    path('updatePattern/', views.updatePattern.as_view()),

    ]