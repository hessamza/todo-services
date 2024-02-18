// todo-list.controller.ts
import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';

import { TodoListService } from '../services/todoListService';
import { CreateTodoListDto, UpdateTodoListDto } from '../input/todoList.dto';

@Controller('todo-lists')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Get()
  async getAllTodoLists(): Promise<any> {
    return await this.todoListService.getAllTodoLists();
  }

  @Get(':id')
  async getTodoListById(@Param('id') id: string): Promise<any> {
    return await this.todoListService.getTodoListById(id);
  }

  @Post()
  async createTodoList(
    @Body() createTodoListDto: CreateTodoListDto,
  ): Promise<any> {
    return await this.todoListService.createTodoList(createTodoListDto);
  }

  @Put(':id')
  async updateTodoList(
    @Param('id') id: string,
    @Body() updateTodoListDto: UpdateTodoListDto,
  ): Promise<any> {
    return await this.todoListService.updateTodoList(id, updateTodoListDto);
  }
}
