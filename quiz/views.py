from django.shortcuts import render

# Create your views here.

def quiz(request):
    return render(request, 'quiz/quiz.html', {})

def room(request):
    return render(request, 'quiz/room.html', {})
