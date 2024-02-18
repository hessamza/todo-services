import { Injectable } from '@nestjs/common';
import { RequestProvider } from '../providers/RequestProvider';
import { CreateTodoListDto, UpdateTodoListDto } from '../input/todoList.dto';

@Injectable()
export class TodoListService {
  constructor(private readonly httpService: RequestProvider) {}

  async getAllTodoLists(): Promise<any> {
    return await this.httpService.get('todo', '/todo-lists', 'data');
  }

  async getTodoListById(id: string): Promise<any> {
    return await this.httpService.get('todo', `/todos/${id}`, 'data');
  }

  async createTodoList(createTodoListDto: CreateTodoListDto): Promise<any> {
    return await this.httpService.post(
      'todo',
      `/api/todo-lists`,
      createTodoListDto,
      'todo',
    );
  }

  async updateTodoList(
    id: string,
    updateTodoListDto: UpdateTodoListDto,
  ): Promise<any> {
    return await this.httpService.put(
      'todo',
      `/todo-lists/${id}`,
      updateTodoListDto,
      'todo',
    );
  }
}
