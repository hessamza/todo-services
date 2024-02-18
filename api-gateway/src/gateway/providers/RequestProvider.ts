import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RequestProvider {
  constructor(
    @Inject('AuthHttpService') private authHttpService: HttpService,
    @Inject('UserHttpService') private userHttpService: HttpService,
    @Inject('TodoHttpService') private todoHttpService: HttpService,
  ) {}
  httpService = {
    auth: this.authHttpService,
    user: this.userHttpService,
    todo: this.todoHttpService,
  };

  async get(
    httpProvider,
    url,
    field,
    params: { [key: string]: any } = {},
    headers = {},
  ) {
    const response = this.httpService[httpProvider].get(url, {
      params: params,
      headers,
    });
    const result: any = await Promise.allSettled([lastValueFrom(response)]);
    let count = {};
    if (result[0].status == 'fulfilled' && params.range) {
      count = result[0].value.headers['content-range'];
      return { count, data: result[0].value.data[field] };
    }
    return result[0].status == 'fulfilled'
      ? result[0].value.data[field]
        ? field && result[0].value.data[field]
        : result[0].value.data
      : { status: 'failed', err: result[0].reason };
  }

  async post(
    httpProvider,
    url,
    body,
    field,
    headers?: { Authorization: string },
  ) {
    const response = this.httpService[httpProvider].post(url, body, {
      headers: headers,
    });
    const result: any = await Promise.allSettled([lastValueFrom(response)]);
    return result[0].status == 'fulfilled'
      ? { status: 'success', data: result[0].value.data }
      : { status: 'failed', err: result[0].reason };
  }

  async put(
    httpProvider,
    url,
    body,
    field,
    headers?: { Authorization: string },
  ) {
    const response = this.httpService[httpProvider].put(url, body, {
      headers: headers,
    });
    const result: any = await Promise.allSettled([lastValueFrom(response)]);
    return result[0].status == 'fulfilled'
      ? { status: 'success', data: result[0].value.data }
      : { status: 'failed', err: result[0].reason };
  }
}
