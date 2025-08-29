from django.core.validators import validate_unicode_slug
from rest_framework import serializers
from .models import WorkoutItem, Exercise, Workout


class ExSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'description', 'video', 'comment']


class WorkoutItemSerializer(serializers.ModelSerializer):
    exercise = serializers.PrimaryKeyRelatedField(queryset=Exercise.objects.all())
    workout = serializers.PrimaryKeyRelatedField(queryset=Workout.objects.all())
    class Meta:
        model = WorkoutItem
        fields = ['id', 'weight', 'sets', 'reps', 'time', 'tempo', 'rir', 'exercise', 'workout']


class WorkoutSerializer(serializers.ModelSerializer):
    workout_items = WorkoutItemSerializer(many=True, allow_null=True, read_only=True)
    class Meta:
        model = Workout
        fields = ['id', 'descriptive_name', 'workout_items']
