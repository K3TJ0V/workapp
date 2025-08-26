from rest_framework import serializers
from .models import WorkoutItem, Exercise, Workout


class ExSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'description', 'video', 'comment']


class WorkoutItemSerializer(serializers.ModelSerializer):
    exercise = serializers.StringRelatedField()
    class Meta:
        model = WorkoutItem
        fields = ['id', 'sets', 'reps', 'time', 'tempo', 'rir', 'exercise']


class WorkoutSerializer(serializers.ModelSerializer):
    description = serializers.CharField(max_length=255, source='descriptive_name')
    workout_items = WorkoutItemSerializer(many=True)
    class Meta:
        model = Workout
        fields = ['id', 'description', 'workout_items']
