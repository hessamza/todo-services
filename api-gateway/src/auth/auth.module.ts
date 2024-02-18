import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: 'http://todo-service_auth-service_1:8000',
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
      provide: 'AuthHttpService',
      useExisting: HttpService,
    },
  ],
  exports: ['AuthHttpService'],
})
export class AuthModule {}
