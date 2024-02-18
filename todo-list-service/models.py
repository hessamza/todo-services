# models.py

from mongoengine import Document, StringField, ListField


class TodoItem(Document):
    title = StringField(required=True)
    description = StringField()
    priority = StringField()


class TodoList(Document):
    title = StringField(required=True)
    items = ListField(StringField(), default=[])
