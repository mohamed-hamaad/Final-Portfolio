from django import template

register = template.Library()

@register.inclusion_tag('partials/components/section_header.html', takes_context=False)
def render_section_header(color='teal', label='', title=''):
    return {'color': color, 'label': label, 'title': title}

@register.inclusion_tag('partials/components/skill_badge.html', takes_context=False)
def render_skill_badge(skill, color='teal'):
    return {'skill': skill, 'color': color}

@register.inclusion_tag('partials/components/btn_primary.html', takes_context=False)
def render_btn_primary(href='#', text='Get Started'):
    return {'href': href, 'text': text}

@register.inclusion_tag('partials/components/btn_secondary.html', takes_context=False)
def render_btn_secondary(href='#', text='Contact'):
    return {'href': href, 'text': text}

@register.inclusion_tag('partials/components/video_button.html', takes_context=False)
def render_video_button(url='#', text='Watch Demo', size='md', color='teal'):
    return {'url': url, 'text': text, 'size': size, 'color': color}
