from django.urls import path

from django.contrib.auth import views as auth_views

from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
	path('', views.index, name='index'),
	path('about/', views.about, name='about'),
	path('logout/', views.logout_view, name='logout_view'),
	path('cd7bea60ca9c3ca7836c5b49fc0035a3/', views.solve_save, name='solve_save'),
	path('a34855817d7232825b3305dd9b74269e/', views.settings_save, name='settings_save'),
	path('b8d4518c2f285f8d04ba68c69d569388/', views.data_pull, name='data_pull'),
	path('d60c4277b86e9764f309326adc3044e2/', views.password_change, name='password_change'),
	path('badbe9100bde4316def8e778a61446c2/', views.username_change, name='username_change'),
	path('b5713481d04749247899a1b26ea0dae9/', views.add_email, name='add_email'),
	path('b9069f9ed3647ebeaf4e110f21e2ad9b/', views.student_reset, name='student_reset'),


    path('password_reset/', auth_views.PasswordResetView.as_view(template_name='lesson/password_reset/password_reset.html', html_email_template_name='lesson/password_reset/password_reset_email.html'), name='password_reset'),
    path('password_reset_sent/', auth_views.PasswordResetDoneView.as_view(template_name='lesson/password_reset/password_reset_done.html'), name='password_reset_done'),
    path('password_reset_confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='lesson/password_reset/password_reset_confirm.html'), name='password_reset_confirm'),
    path('password_reset_complete/', auth_views.PasswordResetCompleteView.as_view(template_name='lesson/password_reset/password_reset_complete.html'), name='password_reset_complete'),

    path('terms_conditions/', views.terms_conditions, name='terms_conditions'),
    path('privacy_policy/', views.privacy_policy, name='privacy_policy'),
    path('cookies_policy/', views.cookies_policy, name='cookies_policy'),
	path('robots.txt', views.robots, name='robots'),
	path('sitemap.xml', views.sitemap, name='sitemap'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
