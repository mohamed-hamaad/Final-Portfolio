from django.shortcuts import render
from .models import *
from django.shortcuts import redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactMessage
from django.http import JsonResponse
from django.views.decorators.http import require_POST
import time
# Create your views here.
def home(request):
    context = {
        'projects': Project.objects.all(),
        'backend_skills': ["Django Framework", "Python Programming", "Django ORM Architecture", "REST Security & JSON"],
        'frontend_skills': ["Tailwind CSS", "Native JavaScript (ES6+)", "AJAX / Async Fetch API", "DOM Manipulation Lifecycle"],
        'tools_skills': ["Relational DBMS (MySQL / SQLite)", "Git & Version Automation"],
        'developer_code': {
            'file_name': 'developer_profile.py',
            'language': 'python'
        }
    }
    return render(request, 'home.html', context)

@require_POST # التزيين ده بيمنع أي حد يدخل على اللينك بـ GET وبيوفر كود
def contact_submit(request):
    name = request.POST.get('name')
    email = request.POST.get('email')
    subject = request.POST.get('subject')
    message_content = request.POST.get('message')
    phone = request.POST.get('phone') # لو حابب تسيف الفون كمان في الداتا بيز
    
    if not all([name, email, subject, message_content]):
        return JsonResponse({'success': False, 'message': 'Missing required fields.'}, status=400)
    
    ContactMessage.objects.create(
        name=name, email=email, subject=subject, message=message_content
    )
    
    email_subject = f" New Portfolio Message: {subject}"
    email_body = f"You received a new message from your portfolio:\n\n" \
                f"Name: {name}\n" \
                f"Email: {email}\n" \
                f"Phone: {phone if phone else 'N/A'}\n\n" \
                f"Message:\n{message_content}"
    
    try:
        send_mail(
            email_subject,
            email_body,
            settings.EMAIL_HOST_USER,
            [settings.EMAIL_HOST_USER],
            fail_silently=False,
        )
        return JsonResponse({'success': True, 'message': 'Message sent successfully!'})
    except Exception as e:
        return JsonResponse({'success': True, 'message': 'Message saved but failed to send email.'})

    
def api_system_status(request):
    time.sleep(0.7) 

    data = {
        "status": "Operational",
        "uptime": "99.98%",
        "environment": "Production Node",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
    }
    return JsonResponse(data)