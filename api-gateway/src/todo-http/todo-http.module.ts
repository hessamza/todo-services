import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: 'http://todo-service_todo-list-service_1:5000',
        headers: {
          Authorization: 'Bearer ' + configService.get('USER_ACCESS_TOKEN'),
          'x-devicetype': 'api',
        },
        timeout: 10000,
        maxRedirects: 5,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: 'TodoHttpService',
      useExisting: HttpService,
    },
  ],
  exports: ['TodoHttpService'],
})
export class TodoHttpModule {}
