from django.db import models


# Create your models here.
class Exercise(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=800, null=True)
    video = models.URLField(max_length=255, null=True)
    comment = models.CharField(max_length=800, null=True)

    def __str__(self):
        return f"{self.name}"


class Workout(models.Model):
    descriptive_name = models.CharField(max_length=255, null=True)


class WorkoutItem(models.Model):
    sets = models.PositiveIntegerField()
    reps = models.PositiveIntegerField(null=True)
    time = models.PositiveIntegerField(null=True)
    tempo = models.CharField(max_length=4, null=True)
    rir = models.CharField(max_length=3, null=True)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE, related_name='workout_items')
