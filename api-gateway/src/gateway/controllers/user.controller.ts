import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../services/userService';
import { CreateUserDto, UpdateUserDto } from '../input/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<any> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<any> {
    return await this.userService.getUserById(userId);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return await this.userService.updateUser(userId, updateUserDto);
  }
}
