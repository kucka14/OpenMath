from django.core.mail import send_mail
from django.template import loader
from .models import Classroom
import json
import random

def make_html_message(template, variable_dict={}):
    html_message = loader.render_to_string(template, variable_dict)
    return html_message

def send_sm(subject, html_message, recipient_list=['openmath.us@gmail.com']):
    send_mail(
              subject,
              '',
              'openmath.us@gmail.com',
              recipient_list,
              fail_silently=True,
              html_message=html_message,
          )

def make_password(length):
    chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 't', 'u', 'v', 'w', 'x', 'y', '3', '4', '6', '7', '8', '9']
    password_list = []
    for i in range(length):
        password_list.append(random.choice(chars))
    password = ''.join(password_list)
    return password

color_dict = {
    'primary-green': '#137a23',
    'primary-blue': '#3e737d',
    'early-blue': '#e9eff0',
    'middle-blue': '#7ea0a6',
    'gray0': '#E8E8E8',
    'gray1': 'lightgray',
    'gray2': 'darkgray',
    'gray3': 'gray',
    'gray4': '#686868',
    'gray5': '#505050',
    'off-black-1': '#2b2a33',
    'off-black-2': '#00131b',
    'blue-black': '#074750',
    'blue-black-dark': '#001e26',
    'metalic-gold': '#D4AF37',
    'dark-green': '#0f3d0f',
}

def get_usertype_display(usertype):
    if usertype == 't':
        usertype_display = 'Teacher'
    else:
        usertype_display = 'Learner'
    return usertype_display

def classroom_query(classcode, class_id, user):
    classroom = Classroom.objects.get(id=class_id, in_trash=False)
    if classroom.in_trash:
        return ['gone', classcode], classroom

    classroom_check = Classroom.objects.filter(classcode=classcode, in_trash=False)
    if len(classroom_check) == 1:
        classroom_viacode = classroom_check[0]
        if classroom == classroom_viacode:
            return ['same'], classroom
    if user in classroom.users.all():
        return ['change', classcode, classroom.classcode], classroom
    raise

def create_classdict(classroom, self_object):
    classdict = {
                  'self': {},
                  'coteachers': {},
                  's13students': {},
                  's12students': {}
                }
    for user in classroom.users.all().order_by('profile__teacher_display_name'):
        profile = user.profile
        permission_status = 'non_owner'
        owners = json.loads(classroom.owners)
        if user.id in owners:
            permission_status = 'owner'
        pass_reset_type = 'blank'
        if profile.usertype == 's13':
            if user.email == '':
                pass_reset_type = 'reset'
            else:
                pass_reset_type = 'block'
        elif profile.usertype == 's12':
            pass_reset_type = 'view'
        userinfo = {
                    'cased_username': profile.cased_username,
                    'user_id': user.id,
                    'display_name': profile.display_name,
                    'teacher_display_name': profile.teacher_display_name,
                    'progress_dict': json.loads(profile.progress_dict),
                    'permission_status': permission_status,
                    'pass_reset_type': pass_reset_type,
                    'override_list': json.loads(profile.override_list),
                    }
        if profile.usertype == 't':
            if user.id == self_object.id:
                classdict['self'][profile.cased_username] = userinfo
            else:
                classdict['coteachers'][profile.cased_username] = userinfo
        elif profile.usertype == 's13':
            classdict['s13students'][profile.cased_username] = userinfo
        elif profile.usertype == 's12':
            classdict['s12students'][profile.cased_username] = userinfo
    return classdict

def create_classlist(user):
    classrooms = user.classroom_set.filter(in_trash=False).order_by('name')
    simple_classlist = []
    for classroom in classrooms:
        classlist = {
                      'name': classroom.name,
                      'classcode': classroom.classcode,
                      'id': classroom.id,
                    }
        simple_classlist.append(classlist)
    return simple_classlist
