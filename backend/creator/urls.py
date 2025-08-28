from django.urls import path
from . import views

urlpatterns = [
    path('exercises/', views.ExList.as_view()),
    path('exercises/add/', views.ExAdd.as_view()),
    path('exercises/show/<str:name>/', views.ExShowUpdateDelete.as_view()),
    path('exercises/update/<str:name>/', views.ExShowUpdateDelete.as_view()),
    path('exercises/delete/<str:name>/', views.ExShowUpdateDelete.as_view()),

    path('workouts/', views.WorkoutList.as_view()),
    path('workouts/add/', views.WorkoutAdd.as_view()),
    path('workouts/show/<int:pk>/', views.WorkoutAddShowUpdateDelete.as_view()),
    path('workouts/delete/<int:pk>/', views.WorkoutAddShowUpdateDelete.as_view()),

    path('work-item/', views.WorkItemList.as_view()),
    path('work-item/add/', views.WorkItemAdd.as_view())
]
