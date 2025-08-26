from django.db.models import Prefetch
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Exercise, Workout, WorkoutItem
from .serializers import ExSerializer, WorkoutSerializer


@api_view()
def ex_list(request):
    queryset = Exercise.objects.all()
    serializer = ExSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view()
def ex_list_specific(request, pk):
    exercise = get_object_or_404(Exercise, pk=pk)
    serializer = ExSerializer(exercise)
    return Response(serializer.data)


@api_view()
def work_list(request):
    queryset = Workout.objects.prefetch_related(
        Prefetch(
            'workout_items',
            queryset=WorkoutItem.objects.select_related('exercise')
        )
    )
    serializer = WorkoutSerializer(queryset, many=True)
    return Response(serializer.data)
