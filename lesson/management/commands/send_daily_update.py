from django.core.management.base import BaseCommand, CommandError
from django.core.mail import send_mail
from datetime import datetime, timezone
from help_functions.summary import selfuserlist
from django.contrib.auth.models import User
import json

class Command(BaseCommand):
    def handle(self, *args, **options):
    
        current_time = datetime.now(timezone.utc)
        
        userlist = [u for u in User.objects.all().order_by('-date_joined') if u.username not in selfuserlist and u.username[:12] != 'ec2f1673ecb5']
        joinlist = []
        for user in userlist:
            join_delta = current_time - user.date_joined
            if join_delta.days < 2:
                joinlist.append([user.date_joined.strftime("%m/%d/%Y, %H:%M:%S"), user.username, user.profile.usertype, user.email])
        
        userlist = [u for u in User.objects.all().order_by('-last_login') if u.username not in selfuserlist and u.username[:12] != 'ec2f1673ecb5']
        loginlist = []
        for user in userlist:
            login_delta = current_time - user.last_login
            if login_delta.days < 2:
                progress_dict = json.loads(user.profile.progress_dict)
                progress_list = []
                for lesson in progress_dict:
                    complete_string = ''
                    if progress_dict[lesson]['lessonComplete']:
                        complete_string = '(Completed)'
                    progress_list.append(lesson + ': ' + str(progress_dict[lesson]['solveLevel'][0]) + '-' + str(progress_dict[lesson]['solveLevel'][1]) + complete_string)
                loginlist.append([user.last_login.strftime("%m/%d/%Y, %H:%M:%S"), user.username, user.profile.usertype, user.email, progress_list])
        es = ''
        es += 'New Users\n'
        for item in joinlist:
            newline = item[0] + ': ' + item[1] + ', ' + item[2] + ', ' + item[3] + '\n'
            es += newline
        es += '\nRecent Logins\n'
        for item in loginlist:
            newline = item[0] + ': ' + item[1] + ', ' + item[2] + ', ' + item[3] + '\n'
            es += newline
            for line in item[4]:
                newline = '\t' + line + '\n'
                es += newline
        send_mail(
          'OpenMath.US Daily Update',
          es,
          'openmath.us@gmail.com',
          ['andrew.kuck@valpo.edu'],
          fail_silently=True,
        )
        return
        
        
