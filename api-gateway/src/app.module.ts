import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { UserHttpModule } from './userHttp/userHttp.module';
import { AuthMiddleware } from './auth.middleware';
import { RequestProvider } from './gateway/providers/RequestProvider';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TodoHttpModule } from './todo-http/todo-http.module';

@Module({
  imports: [
    GatewayModule,
    UserHttpModule,
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    TodoHttpModule,
  ],
  controllers: [AppController],
  providers: [RequestProvider, AppService],

})
export class AppModule {}
