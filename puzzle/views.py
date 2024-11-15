from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.http import JsonResponse
from .models import Tab, Resource, Standard
from .forms import *
from .view_functions import *
from django.core.mail import send_mail
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import authenticate, login, logout
import time

# Create your views here.

@ensure_csrf_cookie
def handle_post(request):

    logged_in = False
    if request.user.is_authenticated:
        if request.user.is_superuser:
            logged_in = True

    if request.method == 'POST':
        status = 'failure'
        post_data = request.POST
        post_type = post_data['type']
        if post_type == 'add_resource':
            name = post_data['arname']
            description = post_data['ardescription']
            question = post_data['arquestion']
            link = post_data['arlink']
            email = post_data['aremail']
            image = request.FILES.get('arimage')
            if image is not None:
                image = request.FILES['arimage']
            resource = Resource(name=name, description=description, question=question, image=image, link=link, email=email)
            resource.save()
            status = 'resource_added'
            if logged_in == False:
                send_mail('Resource Submitted', 'An openmath resource has been submitted.', 'openmath.us@gmail.com', ['openmath.us@gmail.com'], fail_silently=True)
        else:
            if logged_in == False:
                if post_type == 'login':
                    password = post_data['password']
                    user = authenticate(request, username='andykuck1', password=password)
                    if user is not None:
                        login(request, user)
                        status = 'login_succeed'
                    else:
                        status = 'login_fail'
            else:
                if post_type == 'logout':
                    logout(request)
                    status = 'logout'
                elif post_type == 'edit_resource':
                    resource_id = post_data['erhiddenrid']
                    resource = Resource.objects.get(id=resource_id)
                    tab_id = post_data['erhiddentid']
                    tab = Tab.objects.get(id=tab_id)
                    name = post_data['ername']
                    description = post_data['erdescription']
                    question = post_data['erquestion']
                    link = post_data['erlink']
                    grade_low = post_data['ergradelow']
                    grade_high = post_data['ergradehigh']
                    group_name = post_data['ergroupname']
                    length = int(post_data['erlength'])

                    standards_string = post_data['erstandards']
                    if (resource.tab == None and standards_string.strip() == '') or (standards_string.strip() == 'reset'):
                        pre_assign_standards(resource)
                    load_standards_string(standards_string, resource)

                    resource.tab = tab
                    resource.name = name
                    resource.description = description
                    resource.question = question
                    resource.link = link
                    resource.grade_low = grade_low
                    resource.grade_high = grade_high
                    resource.group_name = group_name
                    resource.length = length
                    resource.save()
                    status = 'resource_edited'
                elif post_type == 'delete_resource':
                    resource_id = post_data['dhiddenrid']
                    resource = Resource.objects.get(id=resource_id)
                    resource.in_trash = True
                    resource.save()
                    status = 'resource_deleted'
    return JsonResponse({'status': status})

@ensure_csrf_cookie
def get_resources(request):
    logged_in = False
    if request.user.is_authenticated:
        if request.user.is_superuser:
            logged_in = True

    status = 'error'
    datalist = ''
    if request.method == 'POST':
        post_data = json.loads(request.body)
        command = post_data['command']
        if command == 'get_resources':
            tablist, personaltablist, fulllist, untablist, full_couplet_list = get_lists(logged_in)
            standards_dict = make_couplet_dict(full_couplet_list)
            datalist = [logged_in, standards_dict, tablist, personaltablist, fulllist, untablist]
            status = 'success'
    return JsonResponse({'status': status, 'datalist': datalist})

def puzzle(request):

    logged_in = False
    if request.user.is_authenticated:
        if request.user.is_superuser:
            logged_in = True

    resource_count = 0
    for t in Tab.objects.filter(in_trash=False, hidden=False):
        if t.index < 100:
            resource_count += t.resource_set.filter(in_trash=False, hidden=False).count()

    return render(request, 'puzzle/puzzle.html', {
                                                'logged_in': logged_in,
                                                'resource_count': resource_count,
                                                })
