import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';
import { UserController } from './controllers/user.controller';
import { RequestProvider } from './providers/RequestProvider';
import { UserService } from './services/userService';
import { UserHttpModule } from '../userHttp/userHttp.module';
import { AuthModule } from '../auth/auth.module';
import { AuthMiddleware } from '../auth.middleware';
import { TodoHttpModule } from '../todo-http/todo-http.module';
import { TodoListController } from './controllers/todo.controller';
import { TodoListService } from './services/todoListService';

@Module({
  imports: [HttpModule, UserHttpModule, AuthModule, TodoHttpModule],
  controllers: [UserController, TodoListController],
  providers: [RequestProvider, UserService, TodoListService],
})
export class GatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'users*', method: RequestMethod.ALL },
        { path: 'todo-lists*', method: RequestMethod.ALL },
      );
  }
}
