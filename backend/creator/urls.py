from django.urls import path
from . import views


urlpatterns = [
    path('exercises/', views.ex_list),
    path('exercises/<int:pk>/', views.ex_list_specific),
    path('workouts/', views.work_list)
]
