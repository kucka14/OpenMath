from django import forms
from django.contrib.auth.forms import UserCreationForm, PasswordChangeForm
from django.contrib.auth.models import User
from django.utils.translation import gettext as _
from django.contrib.auth import authenticate
from random import randint
from django.db import IntegrityError
from .models import Classroom, Profile

def make_picpass(length):
    picpass_list = []
    for i in range(length):
        picpass_list.append(str(randint(1,9)))
    picpass = ''.join(picpass_list)
    return picpass

# Changes here should be made in help_functions as well
class TeacherCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

    def clean(self):
        cleaned_data = super(TeacherCreationForm, self).clean()
        username = cleaned_data['username']
        cleaned_data['cased_username'] = username
        cleaned_data['username'] = username.lower()
        return cleaned_data

    def save(self, commit=True):
        user = super(TeacherCreationForm, self).save(commit=False)
        if commit:
            user.save()
        if commit:
            cased_username = self.cleaned_data['cased_username']
            profile = Profile(user=user, cased_username=cased_username, display_name=cased_username, teacher_display_name='')
            profile.usertype = 't'
            profile.save()
        return user

# Changes here should be made in help_functions as well
class Student13CreationForm(UserCreationForm):
    email = forms.EmailField(required=False)
    classcode = forms.CharField(required=False, max_length=20, widget=forms.TextInput(attrs={'id':'s13-classcode-input'}))
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

    def clean(self):
        cleaned_data = super(Student13CreationForm, self).clean()
        username = cleaned_data['username']
        cleaned_data['cased_username'] = username
        cleaned_data['username'] = username.lower()
        cleaned_classcode = cleaned_data['classcode'].upper()
        classroom_query = Classroom.objects.filter(classcode=cleaned_classcode)
        cleaned_email = cleaned_data['email']
        if cleaned_email.strip() == '':
            if cleaned_classcode.strip() == '':
                raise forms.ValidationError(_('You must provide either an email or a class code.'), code='s13login_error')
            elif len(classroom_query) == 0:
                raise forms.ValidationError(_('That class code is not valid. Provide a valid class code, or an email.'), code='s13login_error')
        elif cleaned_classcode.strip() != '' and len(classroom_query) == 0:
            raise forms.ValidationError(_('That class code is not valid. Provide a valide class code, or leave blank.'), code='s13login_error')
        return cleaned_data

    def save(self, commit=True):
        user = super(Student13CreationForm, self).save(commit=False)
        if commit:
            user.save()

        classcode = self.cleaned_data['classcode']
        classroom_query = Classroom.objects.filter(classcode=classcode)
        if len(classroom_query) == 1:
            classroom = classroom_query[0]
            classroom.users.add(user)
            if commit:
                classroom.save()

        if commit:
            cased_username = self.cleaned_data['cased_username']
            profile = Profile(user=user, cased_username=cased_username, display_name=cased_username, teacher_display_name='')
            profile.usertype = 's13'
            profile.save()
        return user

# Changes here should be made in help_functions as well
class Student12CreationForm(UserCreationForm):
    classcode = forms.CharField(required=True, max_length=20, widget=forms.TextInput(attrs={'id':'s12-classcode-input'}))
    class Meta:
        model = User
        fields = ('username',)

    def __init__(self, *args, **kwargs):
        super(Student12CreationForm, self).__init__(*args, **kwargs)
        self.fields['password1'].required = False
        self.fields['password2'].required = False

    def clean(self):
        cleaned_data = super(Student12CreationForm, self).clean()
        username = cleaned_data['username']
        cleaned_data['cased_username'] = username
        cleaned_data['username'] = username.lower()
        cleaned_classcode = cleaned_data['classcode'].upper()
        classroom_query = Classroom.objects.filter(classcode=cleaned_classcode)
        if len(classroom_query) == 0:
            raise forms.ValidationError(_('That is not a valid class code.'), code='s12login_error')
        return cleaned_data

    def save(self, commit=True):
        user = super(Student12CreationForm, self).save(commit=False)
        if commit:
            user.set_unusable_password()
            user.save()

        if commit:
            cased_username = self.cleaned_data['cased_username']
            profile = Profile(user=user, cased_username=cased_username, display_name=cased_username, teacher_display_name='')
            profile.usertype = 's12'
            while True:
                try:
                    picpass = make_picpass(8)
                    profile.picture_password = picpass
                    profile.save()
                    break
                except IntegrityError:
                    pass

        classcode = self.cleaned_data['classcode']
        classroom = Classroom.objects.get(classcode=classcode)
        classroom.users.add(user)
        if commit:
            classroom.save()

        return user

class LoginForm(forms.Form):
    username = forms.CharField(max_length=150)
    password = forms.CharField(widget=forms.PasswordInput)
    def clean(self):
        form_data = super(LoginForm, self).clean()
        username = form_data['username'].lower()
        password = form_data['password']

        user_query = User.objects.filter(username=username)
        if len(user_query) == 1:
            if user_query[0].profile.usertype == 's12':
                profile_query = Profile.objects.filter(picture_password=password)
                if len(profile_query) == 1:
                    return profile_query[0].user
                else:
                    raise forms.ValidationError(_('Username or password was incorrect. Consider using the picture login.'), code='incorrect_login')

        user = authenticate(username=username, password=password)
        if user is None:
            raise forms.ValidationError(_('Username or password was incorrect.'), code='incorrect_login')
        return user

class PictureLoginForm(forms.Form):
    password = forms.CharField(widget=forms.HiddenInput(attrs={'id':'picpass-form-password'}))
    def clean(self):
        form_data = super(PictureLoginForm, self).clean()
        password = form_data['password']
        profile_query = Profile.objects.filter(picture_password=password)
        if len(profile_query) == 1:
            return profile_query[0].user
        else:
            raise forms.ValidationError(_('That password does not match any user.'), code='incorrect_picpass_login')

class PasswordChangeForm(PasswordChangeForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['old_password'].widget.attrs.update({'autofocus': False})

class UsernameChangeForm(forms.Form):

    oldusername = forms.CharField(required=True, widget=forms.HiddenInput(attrs={'id':'ucf-oldusername'}))
    newusername = forms.CharField(required=True, max_length=150, widget=forms.TextInput(attrs={'id':'ucf-newusername'}))
    password = forms.CharField(required=True, widget=forms.PasswordInput(attrs={'id':'ucf-password'}))

    def clean(self):
        try:
            cleaned_data = self.cleaned_data
            oldusername = cleaned_data['oldusername'].lower()
            newusername = cleaned_data['newusername']
            password = cleaned_data['password']

            user = ''
            user_query = User.objects.filter(username=oldusername)
            if len(user_query) == 1:
                if user_query[0].profile.usertype == 's12':
                    profile_query = Profile.objects.filter(picture_password=password)
                    if len(profile_query) == 1:
                        user = profile_query[0].user
                    else:
                        return 'incorrect'

            if user == '':
                user = authenticate(username=oldusername, password=password)

            if user is None:
                return 'incorrect'
            else:
                return [user, newusername]

        except:
            return 'invalid'

class AddEmailForm(forms.Form):
    email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={'id':'addemail-input'}))
