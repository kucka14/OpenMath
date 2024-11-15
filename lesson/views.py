from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, update_session_auth_hash
from django.http import JsonResponse
from .forms import *
from .view_functions import *
import json
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import Classroom
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.conf import settings
import math

# Create your views here.

@ensure_csrf_cookie
def solve_save(request):
    status = 'error'
    message = ''
    if request.user.is_authenticated:
        if request.method == 'POST':
            post_data = json.loads(request.body)

            now_change = post_data['now_change']
            now_lesson = now_change[0]
            now_solve_level = now_change[1]
            restart_current = now_change[2]

            profile = request.user.profile
            request_refresh = True
            saved_progress_dict = json.loads(profile.progress_dict)
            if now_lesson in saved_progress_dict:
                saved_solve_level = saved_progress_dict[now_lesson]['solveLevel']
                saved_lesson_complete = saved_progress_dict[now_lesson]['lessonComplete']
            else:
                request_refresh = False

            complete_save = True
            if request_refresh:
                if (now_solve_level[0] < saved_solve_level[0]) and (restart_current == False) and (saved_lesson_complete == False):
                    message = 'request_refresh'
                    status = 'success'
                    complete_save = False
            if complete_save:
                progress_dict = post_data['progress_dict']
                progress_dict_json = json.dumps(progress_dict)
                profile.progress_dict = progress_dict_json
                profile.save()
                status = 'success'
    return JsonResponse({'status': status, 'message': message})

@ensure_csrf_cookie
def settings_save(request):
    status = 'error'
    message = ''
    if request.user.is_authenticated:
        if request.method == 'POST':
            post_data = json.loads(request.body)
            save_type = post_data['save_type']
            if save_type == 'new_classroom':
                if request.user.profile.usertype == 't':
                    classroom_name = post_data['newdata']
                    div_id = post_data['div_id']
                    classroom = Classroom(name=classroom_name)
                    classroom.save()
                    classroom.users.add(request.user)
                    owners = [request.user.id]
                    owners_json = json.dumps(owners)
                    classroom.owners = owners_json
                    classroom.save()
                    message = [classroom.classcode, div_id, classroom.id]
                    status = 'success'
            if save_type == 'join_classroom':
                if request.user.profile.usertype == 't':
                    class_id = -1
                    classcode = post_data['newdata']
                    div_id = post_data['div_id']
                    classroom_check = Classroom.objects.filter(classcode=classcode, in_trash=False)
                    if len(classroom_check) == 1:
                        classroom = classroom_check[0]
                        class_id = classroom.id
                        if request.user in classroom.users.all():
                            div_id = -2
                        else:
                            classroom.users.add(request.user)
                            classroom.save()
                            div_id = classroom.name
                    else:
                        div_id = -1
                    message = [classcode, div_id, class_id]
                    status = 'success'
            if save_type == 'edit_classname':
                classcode = post_data['classcode']
                class_id = post_data['class_id']
                change_status, classroom = classroom_query(classcode, class_id, request.user)
                if (request.user in classroom.users.all()) and (request.user.profile.usertype == 't'):
                    owners = json.loads(classroom.owners)
                    if request.user.id in owners:
                        new_name = post_data['new_name']
                        classroom.name = new_name
                        classroom.save()
                        message = [change_status, 'access']
                    else:
                        message = [change_status, 'noaccess']
                    status = 'success'
            if save_type == 'add_student':
                user_id = post_data['user_id']
                user = User.objects.get(id=user_id)
                if user == request.user:
                    classcode = post_data['classcode']
                    classroom_check = Classroom.objects.filter(classcode=classcode, in_trash=False)
                    if len(classroom_check) == 1:
                        classroom = classroom_check[0]
                        if user in classroom.users.all():
                            message = ['redundant']
                        else:
                            classroom.users.add(user)
                            classroom.save()
                            classinfo_dict = {
                                                'name': classroom.name,
                                                'teachers': [[teacher.profile.cased_username, teacher.profile.display_name] for teacher in classroom.users.filter(profile__usertype='t')],
                                            }
                            message = [classroom.classcode, classinfo_dict]
                    else:
                        message = ['invalid']
                    status = 'success'
            if save_type == 'open_lessons':
                if request.user.profile.usertype == 't':
                    classcode = post_data['classcode']
                    class_id = post_data['class_id']
                    change_status, classroom = classroom_query(classcode, class_id, request.user)
                    owners = json.loads(classroom.owners)
                    if request.user.id in owners:
                        user_id = post_data['user_id']
                        user = User.objects.get(id=user_id)
                        override_list = post_data['override_list']
                        override_list_json = json.dumps(override_list)
                        user.profile.override_list = override_list_json
                        user.profile.save()
                        message = [change_status, 'access', classroom.classcode]
                    else:
                        message = [change_status, 'noaccess']
                    status = 'success'
            if save_type == 'remove_student':
                if request.user.profile.usertype == 't':
                    classcode = post_data['classcode']
                    class_id = post_data['class_id']
                    change_status, classroom = classroom_query(classcode, class_id, request.user)
                    owners = json.loads(classroom.owners)
                    if request.user.id in owners:
                        user_id = post_data['user_id']
                        user = User.objects.get(id=user_id)
                        classroom.users.remove(user)
                        classroom.save()
                        message = [change_status, 'access', [user.id, classroom.classcode]]
                    else:
                        message = [change_status, 'noaccess']
                    status = 'success'
            if save_type == 'delete_class':
                classcode = post_data['classcode']
                class_id = post_data['class_id']
                change_status, classroom = classroom_query(classcode, class_id, request.user)
                if (request.user in classroom.users.all()) and (request.user.profile.usertype == 't'):
                    owners = json.loads(classroom.owners)
                    if request.user.id in owners:
                        if change_status[0] == 'same':
                            classroom.in_trash = True
                            classroom.save()
                        message = [change_status, 'access', classroom.classcode]
                    else:
                        message = [change_status, 'noaccess']
                    status = 'success'
            if save_type == 'edit_teacher_display':
                if request.user.profile.usertype == 't':
                    user_id = post_data['user_id']
                    user = User.objects.get(id=user_id)
                    classcode = post_data['classcode']
                    class_id = post_data['class_id']
                    change_status, classroom = classroom_query(classcode, class_id, request.user)
                    if user in classroom.users.all():
                        owners = json.loads(classroom.owners)
                        if request.user.id in owners:
                            teacher_display_name = post_data['teacher_display_name']
                            user.profile.teacher_display_name = teacher_display_name
                            user.profile.save()
                            message = [change_status, 'access']
                        else:
                            message = [change_status, 'noaccess']
                        status = 'success'
            if save_type == 'edit_student_display':
                user_id = post_data['user_id']
                student = User.objects.get(id=user_id)
                if student == request.user:
                    display_name = post_data['display_name']
                    student.profile.display_name = display_name
                    student.profile.save()
                    status = 'success'
            if save_type == 'add_owner':
                if request.user.profile.usertype == 't':
                    classcode = post_data['classcode']
                    class_id = post_data['class_id']
                    change_status, classroom = classroom_query(classcode, class_id, request.user)
                    owners = json.loads(classroom.owners)
                    if request.user.id in owners:
                        user_id = post_data['user_id']
                        user = User.objects.get(id=user_id)
                        if user in classroom.users.all() and user.profile.usertype == 't':
                            owners.append(user_id)
                            classroom.owners = json.dumps(owners)
                            classroom.save()
                            message = [change_status, user_id, classroom.classcode]
                            status = 'success'
            if save_type == 'remove_ownership':
                if request.user.profile.usertype == 't':
                    classcode = post_data['classcode']
                    class_id = post_data['class_id']
                    change_status, classroom = classroom_query(classcode, class_id, request.user)
                    owners = json.loads(classroom.owners)
                    if request.user.id in owners:
                        user_id = post_data['user_id']
                        user = User.objects.get(id=user_id)
                        if user in classroom.users.all() and user.profile.usertype == 't':
                            if user_id in owners:
                                owners.remove(user_id)
                                classroom.owners = json.dumps(owners)
                                classroom.save()
                                message = [change_status, user_id, classroom.classcode]
                                status = 'success'
            if save_type == 'change_classcode':
                if request.user.profile.usertype == 't':
                    oldcode = post_data['classcode']
                    class_id = post_data['class_id']
                    change_status, classroom = classroom_query(oldcode, class_id, request.user)
                    owners = json.loads(classroom.owners)
                    if request.user.id in owners:
                        newcode = ''
                        if change_status[0] == 'same':
                            newcode = classroom.change_classcode()
                        message = [change_status, oldcode, newcode]
                    else:
                        message = [change_status, 'noaccess']
                    status = 'success'
    return JsonResponse({'status': status, 'message': message})

@ensure_csrf_cookie
def data_pull(request):
    status = 'error'
    message = ''
    if request.user.is_authenticated:
        if request.method == 'POST':
            post_data = json.loads(request.body)
            pull_type = post_data['pull_type']
            if pull_type == 'classdict':
                classcode = post_data['classcode']
                class_id = post_data['class_id']
                refresh_check = post_data['refresh_check']
                change_status, classroom = classroom_query(classcode, class_id, request.user)
                classdict = create_classdict(classroom, request.user)
                message = [change_status, classroom.classcode, classdict, refresh_check, class_id]
                status = 'success'
    return JsonResponse({'status': status, 'message': message})

@ensure_csrf_cookie
def password_change(request):
    status = 'error'
    message = ''
    if request.user.is_authenticated:
        if request.method == 'POST':
            change_password_form = PasswordChangeForm(user=request.user, data=request.POST)
            if change_password_form.is_valid():
                change_password_form.save()
                update_session_auth_hash(request, change_password_form.user)
            else:
                message = 'invalid'
            status = 'success'
    return JsonResponse({'status': status, 'message': message})

@ensure_csrf_cookie
def username_change(request):
    status = 'error'
    message = ''
    if request.user.is_authenticated:
        if request.method == 'POST':
            change_username_form = UsernameChangeForm(request.POST)
            if change_username_form.is_valid():
                change_status = change_username_form.cleaned_data
                if change_status == 'incorrect':
                    message = 'incorrect'
                elif change_status == 'taken':
                    message = 'taken'
                elif change_status == 'invalid':
                    message = 'invalid'
                else:
                    user = change_status[0]
                    if request.user == user:
                        cased_newusername = change_status[1]
                        newusername = cased_newusername.lower()
                        save_successful = False
                        try:
                            user.username = newusername
                            user.save()
                            save_successful = True
                        except IntegrityError:
                            message = 'taken'
                        if save_successful:
                            user.profile.cased_username = cased_newusername
                            user.profile.save()
                            logout(request)
                            login(request, user)
                            message = user.profile.cased_username
                    else:
                        message = 'invalid'
            else:
                message = 'invalid'
            status = 'success'
    return JsonResponse({'status': status, 'message': message})

@ensure_csrf_cookie
def add_email(request):
    status = 'error'
    message = ''
    if request.user.is_authenticated:
        if request.method == 'POST':
            add_email_form = AddEmailForm(request.POST)
            if add_email_form.is_valid():
                email = add_email_form.cleaned_data['email']
                request.user.email = email
                request.user.save()
                message = email
                status = 'success'
    return JsonResponse({'status': status, 'message': message})

@ensure_csrf_cookie
def student_reset(request):
    status = 'error'
    message = ''
    if request.user.is_authenticated:
        if request.method == 'POST':
            post_data = json.loads(request.body)
            reset_type = post_data['reset_type']
            class_id = post_data['class_id']
            user_id = post_data['user_id']
            classroom = Classroom.objects.get(id=class_id)
            user = User.objects.get(id=user_id)
            if user in classroom.users.all():
                owners = json.loads(classroom.owners)
                if request.user.id in owners:
                    if reset_type == 'view':
                        password = user.profile.picture_password
                        message = password
                    elif reset_type == 'reset':
                        password = make_password(6)
                        user.set_password(password)
                        user.save()
                        message = [password, user.profile.teacher_display_name, user.profile.cased_username]
                    status = 'success'
    return JsonResponse({'status': status, 'message': message})

def logout_view(request):
    logout(request)
    return redirect('index')

def index(request):

    if request.user.is_authenticated:
        user = request.user
        profile = user.profile
        usertype = profile.usertype
        override_list = json.loads(profile.override_list)
        usertype_display = get_usertype_display(usertype)
        progress_dict = json.loads(profile.progress_dict)
        is_new_user = profile.is_new_user
        if is_new_user:
            profile.is_new_user = False
            profile.save()
        simple_classlist = ''
        if usertype == 't':
            simple_classlist = create_classlist(user)
        enrolled_dict = {};
        for classroom in user.classroom_set.filter(in_trash=False).order_by('name'):
            enrolled_dict[classroom.classcode] = {
                                                    'name': classroom.name,
                                                    'teachers': [[teacher.profile.cased_username, teacher.profile.display_name] for teacher in classroom.users.filter(profile__usertype='t')],
                                                }

        change_username_form = UsernameChangeForm(initial = {'oldusername': user.username})
        change_password_form = ''
        if usertype == 't' or usertype == 's13':
            change_password_form = PasswordChangeForm(user=user)
        add_email_form = ''
        if usertype == 's13' and user.email == '':
            add_email_form = AddEmailForm()

        return render(request, 'lesson/dashboard.html', {
                                                            'cased_username': profile.cased_username,
                                                            'user_id': user.id,
                                                            'display_name': profile.display_name,
                                                            'picture_password': profile.picture_password,
                                                            'usertype': usertype,
                                                            'usertype_display': usertype_display,
                                                            'progress_dict': progress_dict,
                                                            'override_list': override_list,
                                                            'is_new_user': is_new_user,
                                                            'simple_classlist': simple_classlist,
                                                            'enrolled_dict': enrolled_dict,
                                                            'change_password_form': change_password_form,
                                                            'change_username_form': change_username_form,
                                                            'color_dict': color_dict,
                                                            'add_email_form': add_email_form,
                                                            'om_is_dev_env': settings.OM_IS_DEV_ENV,
                                                    })

    else:
        tregister_form = TeacherCreationForm()
        s13register_form = Student13CreationForm()
        s12register_form = Student12CreationForm()
        login_form = LoginForm()
        picture_login_form = PictureLoginForm()

        if 'tregister_submit' in request.POST:
            tregister_form = TeacherCreationForm(request.POST)
            if tregister_form.is_valid():
                user = tregister_form.save()
                login(request, user)
                if user.profile.usertype == 't':
                    html_message = make_html_message('emails/' + 'a' + '1' + '.html')
                    send_sm('Thanks for creating an account!', html_message, recipient_list=[user.email])
                return redirect('index')

        if 's13register_submit' in request.POST:
            s13register_form = Student13CreationForm(request.POST)
            if s13register_form.is_valid():
                user = s13register_form.save()
                login(request, user)
                return redirect('index')

        if 's12register_submit' in request.POST:
            s12register_form = Student12CreationForm(request.POST)
            if s12register_form.is_valid():
                user = s12register_form.save()
                login(request, user)
                return redirect('index')

        if 'login_submit' in request.POST:
            login_form = LoginForm(request.POST)
            if login_form.is_valid():
                user = login_form.cleaned_data
                login(request, user)
                return redirect('index')

        if 'picture_login_submit' in request.POST:
            picture_login_form = PictureLoginForm(request.POST)
            if picture_login_form.is_valid():
                user = picture_login_form.cleaned_data
                login(request, user)
                return redirect('index')

        return render(request, 'lesson/index.html', {
                                                    'tregister_form': tregister_form,
                                                    's13register_form': s13register_form,
                                                    's12register_form': s12register_form,
                                                    'login_form': login_form,
                                                    'picture_login_form': picture_login_form,
                                                    'color_dict': color_dict,
                                                    })

def about(request):
    return render(request, 'lesson/about.html', {})

def privacy_policy(request):
    return render(request, 'lesson/policies/privacy_policy.html', {})

def cookies_policy(request):
    return render(request, 'lesson/policies/cookies_policy.html', {})

def terms_conditions(request):
    return render(request, 'lesson/policies/terms_conditions.html', {})

def robots(request):
    return render(request, 'lesson/policies/robots.txt')

def sitemap(request):
    return render(request, 'lesson/policies/sitemap.xml')
