import os
from django.core.wsgi import get_wsgi_application
from django.core.management import call_command

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Portfolio.settings')

application = get_wsgi_application()

# تشغيل الـ Migrate ونقل البيانات أوتوماتيك عند الـ Deploy
try:
    # 1. بيبني الجداول في Neon
    call_command('migrate', interactive=False)
    
    # 2. بيرفع المشاريع اللي إنت عملتها من ملف الـ json
    if os.path.exists('projects.json'):
        call_command('loaddata', 'projects.json')
        print("Projects loaded to Neon successfully!")
        
except Exception as e:
    print(f"Deployment script failed: {e}")