from flask import Blueprint, jsonify, request

from app.controllers import todo_list_controller

# Create a Blueprint instance for organizing routes
api_bp = Blueprint('api', __name__)


# Define routes for todo items


# Define routes for todo lists
@api_bp.route('/todo-lists', methods=['POST'])
def create_todo_list():
    return todo_list_controller.create_todo_list()


@api_bp.route('/todo-lists/<todo_list_id>', methods=['GET'])
def get_todo_list(todo_list_id):
    return todo_list_controller.get_todo_list(todo_list_id)


@api_bp.route('/todo-lists/<todo_list_id>', methods=['PUT'])
def update_todo_list(todo_list_id):
    return todo_list_controller.update_todo_list(todo_list_id)


@api_bp.route('/todo-lists/<todo_list_id>', methods=['DELETE'])
def delete_todo_list(todo_list_id):
    return todo_list_controller.delete_todo_list(todo_list_id)
