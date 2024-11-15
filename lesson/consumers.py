
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

class LessonConsumer(WebsocketConsumer):

    def connect(self):
        self.classcode = self.scope['url_route']['kwargs']['classcode']
        async_to_sync(self.channel_layer.group_add)(self.classcode, self.channel_name)
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.classcode, self.channel_name)
        allData = {
            'dataType': 'disconnectData',
            'sendData': 'disconnect',
            'sendOrigin': self.channel_name
        }
        async_to_sync(self.channel_layer.group_send)(self.classcode, {'type': 'update','allData': allData,})

    def receive(self, text_data):

        text_data = json.loads(text_data)

        allData = text_data['allData']
        sendTarget = text_data['sendTarget']

        allData['sendOrigin'] = self.channel_name

        if sendTarget == None:
            pass
        elif sendTarget == 'all':
            async_to_sync(self.channel_layer.group_send)(self.classcode, {'type': 'update', 'allData': allData,})
        else:
            async_to_sync(self.channel_layer.send)(sendTarget, {'type': 'update','allData': allData,})

    def update(self, event):
        self.send(text_data=json.dumps({'allData': event['allData']}))
