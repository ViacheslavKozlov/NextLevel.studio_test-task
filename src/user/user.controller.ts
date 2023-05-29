import { Controller, Get, Param } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

@Controller('users')
export class UserController {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';

  @Get()
  async getUsers(): Promise<User[]> {
    const response: AxiosResponse<User[]> = await axios.get(this.apiUrl);
    return response.data;
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    const url = `${this.apiUrl}/${id}`;
    const response: AxiosResponse<User> = await axios.get(url);
    return response.data;
  }
}
