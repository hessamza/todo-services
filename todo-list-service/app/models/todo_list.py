from mongoengine import Document, StringField


class TodoList(Document):
    title = StringField(required=True)
