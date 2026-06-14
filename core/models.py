from django.db import models

# Create your models here.

from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, help_text="Auto-generated if left blank.")
    subtitle = models.CharField(max_length=250, help_text="A short punchy description for the preview card.")
    description = models.TextField(help_text="Detailed description of the project, challenges, and solutions.")
    mobile_desc = models.TextField(blank=True, null=True, help_text="A concise version of the description for mobile view.")
    technologies = models.CharField(max_length=500, help_text="Comma-separated skills (e.g., Django, Tailwind, MySQL, JS)")
    
    image = models.ImageField(upload_to='projects/', help_text="Main project screenshot")
    github_url = models.URLField(max_length=300, blank=True, null=True)
    live_url = models.URLField(max_length=300, blank=True, null=True)
    
    is_featured = models.BooleanField(default=False, help_text="Check this if it's your flagship project (like the Client Store) to change its layout.")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def get_tech_list(self):
        
        if self.technologies:
            return [tech.strip() for tech in self.technologies.split(',')]
        return []


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"