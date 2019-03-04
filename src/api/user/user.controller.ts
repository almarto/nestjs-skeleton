import { ApiUseTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateUserDto } from './models/CreateUserDto';
import { UsersService } from './user.service';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  public async getUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':userId')
  public async getUser(@Param('userId') userId: string) {
    const user = await this.usersService.getUser(userId);
    return user;
  }

  @Post()
  public async addUser(@Body() user: CreateUserDto) {
    const createdUser = await this.usersService.addUser(user);
    return createdUser;
  }

  @Put(':userId')
  public async updateUser(
    @Param('userId') userId: string,
    @Body() user: CreateUserDto,
  ) {
    const createdUser = await this.usersService.updateUser(userId, user);
    return createdUser;
  }

  @Delete()
  public async deleteUser(@Param('userId') userId: string) {
    const users = await this.usersService.deleteUser(userId);
    return users;
  }
}