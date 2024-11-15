from django.urls import path

from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
	path('', views.puzzle, name='puzzle'),
	path('d268b0410d0c22c33609a1bc7dcfaf44/', views.handle_post, name='handle_post'),
	path('e874f08ed6bf9fcf08dd82eb7bad8806/', views.get_resources, name='get_resources'),
	# path('f8804dd0d43e3c5abc430034e0bb545d/', views.tracker, name='tracker'),
	# path('confirm_updates/<str:recipient_id>/', views.confirm_updates, name='confirm_updates'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
