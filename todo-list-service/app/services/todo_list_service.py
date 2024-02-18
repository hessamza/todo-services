from models import TodoList


class TodoListService:
    @staticmethod
    def create_todo_list(title):
        todo_list = TodoList(title=title)
        todo_list.save()
        return todo_list

    @staticmethod
    def get_todo_list(todo_list_id):
        return TodoList.objects(id=todo_list_id).first()

    @staticmethod
    def update_todo_list(todo_list_id, data):
        todo_list = TodoList.objects(id=todo_list_id).first()
        if todo_list:
            todo_list.update(**data)
            return todo_list.reload()
        return None

    @staticmethod
    def delete_todo_list(todo_list_id):
        todo_list = TodoList.objects(id=todo_list_id).first()
        if todo_list:
            todo_list.delete()
            return True
        return False
