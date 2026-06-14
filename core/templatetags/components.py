from django import template

register = template.Library()

@register.simple_tag
def section_header(color='teal', label='', title=''):
    return {
        'color': color,
        'label': label,
        'title': title,
    }

@register.simple_tag
def skill_badge(skill, color='teal'):
    return {
        'skill': skill,
        'color': color,
    }

@register.simple_tag
def btn_primary(href='#', text='Get Started'):
    return {
        'href': href,
        'text': text,
    }

@register.simple_tag
def btn_secondary(href='#', text='Contact'):
    return {
        'href': href,
        'text': text,
    }

@register.simple_tag
def video_button(url='#', text='Watch Demo', size='md', color='teal'):
    return {
        'url': url,
        'text': text,
        'size': size,
        'color': color,
    }
