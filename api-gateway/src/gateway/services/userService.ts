import { Injectable } from '@nestjs/common';
import { RequestProvider } from '../providers/RequestProvider';
import { CreateUserDto, UpdateUserDto } from '../input/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly httpService: RequestProvider) {}

  async getAllUsers(): Promise<any> {
    return await this.httpService.get('user', '/users', 'data');
  }

  async getUserById(userId: string): Promise<any> {
    return await this.httpService.get('user', `/users/${userId}`, 'data');
  }

  async createUser(userData: CreateUserDto): Promise<any> {
    return await this.httpService.post('user', `/users`, userData, 'user');
  }

  async updateUser(
    userId: string,
    updatedUserData: UpdateUserDto,
  ): Promise<any> {
    return await this.httpService.put(
      'user',
      `/users/${userId}`,
      updatedUserData,
      'user',
    );
  }
}
