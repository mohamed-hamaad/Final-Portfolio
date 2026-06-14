from django import views
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .views import *
from django.views.static import serve
from django.urls import re_path
urlpatterns = [
    path('', home, name='home'),
    path('contact/submit/', contact_submit, name='contact_submit'),
    path('api/system-status/', api_system_status, name='api_system_status'),
    
    
    re_path(r'^media/(?*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?*)$', serve, {'document_root': settings.STATIC_ROOT}),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)