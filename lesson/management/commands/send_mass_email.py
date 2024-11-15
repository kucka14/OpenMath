from django.core.management.base import BaseCommand, CommandError
from massmail.massmail import make_and_send
import datetime

class Command(BaseCommand):
    def handle(self, *args, **options):
#        weekday = datetime.datetime.now().strftime('%A')
#        if weekday == 'Tuesday' or weekday == 'Wednesday' or weekday == 'Thursday':
        try:
            make_and_send()
#            send_mail(
#                'Daily openmath emails sent',
#                'The daily openmath emails were sent successfully with Heroku scheduler.',
#                'openmath.us@gmail.com',
#                ['andrew.kuck@valpo.edu'],
#                fail_silently=True,
#            )
        except Exception as e:
            print(e)
#            send_mail(
#                'Error with daily send',
#                str(e),
#                'openmath.us@gmail.com',
#                ['andrew.kuck@valpo.edu'],
#                fail_silently=True,
#            )
        return
        
        
