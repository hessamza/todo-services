import { Global, Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: 'http://todo-service_user-service_1:3000',
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
      provide: 'UserHttpService',
      useExisting: HttpService,
    },
  ],
  exports: ['UserHttpService'],
})
export class UserHttpModule {}
