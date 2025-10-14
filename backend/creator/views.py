from django.db.models import Prefetch
from django.shortcuts import get_object_or_404
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Exercise, Workout, WorkoutItem
from .serializers import ExSerializer, WorkoutSerializer, WorkoutItemSerializer, ExOnlyIdAndNameSerializer


class ExList(APIView):
    def get(self, request):
        queryset = Exercise.objects.all()
        serializer = ExSerializer(queryset, many=True)
        return Response(serializer.data)
class ExShowIdAndName(APIView):
    def get(self, request):
        queryset = Exercise.objects.all()
        serializer = ExOnlyIdAndNameSerializer(queryset, many=True)
        return Response(serializer.data)

class ExAdd(APIView):
    def post(self, request):
        serializer = ExSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if Exercise.objects.filter(name=serializer.validated_data["name"]).exists():
            return Response({"error": "This exercise is already declared"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class ExShowUpdateDelete(APIView):
    def get(self, request, name):
        exercise = get_object_or_404(Exercise, name=name)
        serializer = ExSerializer(exercise)
        return Response(serializer.data)
    def put(self, request, name):
        exercise = get_object_or_404(Exercise, name=name)
        serializer = ExSerializer(exercise, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    def delete(self, request, name):
        exercise = get_object_or_404(Exercise, name=name)
        exercise.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class WorkoutList(APIView):
    def get(self, request):
        queryset = Workout.objects.prefetch_related(
            Prefetch(
                'workout_items',
                queryset=WorkoutItem.objects.all()
            )
        )
        serializer = WorkoutSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class WorkoutAdd(APIView):
    def post(self, request):
        serializer = WorkoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class WorkoutShowUpdateDelete(APIView):
    def get(self, request, pk):
        workout = get_object_or_404(Workout, pk=pk)
        serializer = WorkoutSerializer(workout)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def put(self, request, pk):
        workout = get_object_or_404(Workout, pk=pk)
        serializer = WorkoutSerializer(workout, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    def delete(self, request, pk):
        workout = get_object_or_404(Workout, pk=pk)
        workout.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class WorkItemList(APIView):
    def get(self, request):
        queryset = WorkoutItem.objects.all()
        serializer = WorkoutItemSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class WorkItemAdd(APIView):
    def post(self, request):
        serializer = WorkoutItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class WorkItemUpdateDelete(APIView):
    def put(self, request, pk):
        work_item_data = get_object_or_404(WorkoutItem, pk=pk)
        serializer = WorkoutItemSerializer(work_item_data, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    def delete(self, request, pk):
        work_item = WorkoutItem.objects.filter(pk=pk)
        work_item.delete()
        return Response({"message": "Item deleted"}, status=status.HTTP_204_NO_CONTENT)
