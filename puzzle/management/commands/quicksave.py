from django.core.management.base import BaseCommand, CommandError
from puzzle.models import SaveList
import datetime
import json

class Command(BaseCommand):
    help = 'Saves important elements from database'

    def handle(self, *args, **options):
        date = datetime.datetime.now().strftime('%m-%d-%y')
        filename = 'savefiles/savelists-' + date + '.json'
        savelist = SaveList.objects.get(id=1)
        tablist = json.loads(savelist.tablist)
        fulllist = json.loads(savelist.fulllist)
        full_couplet_list = json.loads(savelist.full_couplet_list)
        masterlist = [tablist, fulllist, full_couplet_list]
        masterlist_json = json.dumps(masterlist)
        f = open(filename, 'w')
        f.write(masterlist_json)
        f.close()

        self.stdout.write('Saved!')
