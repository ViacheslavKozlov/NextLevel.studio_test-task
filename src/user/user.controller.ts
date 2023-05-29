import { Controller, Get, Param } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { ApiTags, ApiOperation, ApiBasicAuth } from '@nestjs/swagger';
import { User } from './user.interface';

@ApiTags('Users')
@ApiBasicAuth()
@Controller('users')
export class UserController {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';

  @Get()
  @ApiOperation({ summary: 'Get list of users' })
  async getUsers(): Promise<User[]> {
    const response: AxiosResponse<User[]> = await axios.get(this.apiUrl);
    return response.data;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  async getUser(@Param('id') id: string): Promise<User> {
    const url = `${this.apiUrl}/${id}`;
    const response: AxiosResponse<User> = await axios.get(url);
    return response.data;
  }
}
