from flask import jsonify, request

from app.services.todo_list_service import TodoListService


def create_todo_list():
    data = request.json
    if 'title' not in data:
        return jsonify({'error': 'Title is required'}), 400
    todo_list = TodoListService.create_todo_list(data['title'])
    return jsonify(todo_list.to_mongo()), 201


def get_todo_list(todo_list_id):
    todo_list = TodoListService.get_todo_list(todo_list_id)
    if todo_list:
        return jsonify(todo_list.to_mongo())
    return jsonify({'error': 'Todo list not found'}), 404


def update_todo_list(todo_list_id):
    data = request.json
    updated_todo_list = TodoListService.update_todo_list(todo_list_id, data)
    if updated_todo_list:
        return jsonify(updated_todo_list.to_mongo())
    return jsonify({'error': 'Todo list not found'}), 404


def delete_todo_list(todo_list_id):
    if TodoListService.delete_todo_list(todo_list_id):
        return jsonify({'message': 'Todo list deleted'})
    return jsonify({'error': 'Todo list not found'}), 404
