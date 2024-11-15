from django.urls import path

from . import consumers

websocket_urlpatterns = [
	path('ws/<str:classcode>/', consumers.LessonConsumer.as_asgi())
]
