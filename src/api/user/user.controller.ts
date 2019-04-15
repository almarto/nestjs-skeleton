import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  HttpStatus,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Response, Request } from 'express';

import { AppAuthGuard } from 'src/api/auth/AppAuthGuard';

import { CreateUserDto } from './models';
import { UserService } from './user.service';

@ApiUseTags('users')
@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  @ApiOperation({ title: 'Get List of All Users' })
  @ApiResponse({ status: 200, description: 'Users Found.' })
  public async getUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':userId')
  @ApiOperation({ title: 'Get User' })
  @ApiResponse({ status: 200, description: 'User Found.' })
  @ApiResponse({ status: 404, description: 'User Not found.' })
  public async getUser(@Param('userId') userId: number) {
    const user = await this.usersService.getUser(userId);
    return user;
  }

  @Post()
  @ApiOperation({ title: 'Create User' })
  @ApiResponse({ status: 200, description: 'User Created.' })
  @ApiResponse({ status: 422, description: 'User Already Exists.' })
  public async addUser(@Body() user: CreateUserDto) {
    const createdUser = await this.usersService.addUser(user);
    delete createdUser.passwordHash;
    return createdUser;
  }

  @Put(':userId')
  @ApiOperation({ title: 'Update User' })
  @ApiResponse({ status: 200, description: 'User Updated.' })
  @ApiResponse({ status: 404, description: 'User Not found.' })
  public async updateUser(@Param('userId') userId: number, @Body() user: CreateUserDto) {
    const createdUser = await this.usersService.updateUser(userId, user);
    return createdUser;
  }

  @Delete()
  @ApiOperation({ title: 'Delete User' })
  @ApiResponse({ status: 200, description: 'User Removed.' })
  @ApiResponse({ status: 404, description: 'User Not found.' })
  public async deleteUser(@Param('userId') userId: number) {
    const users = await this.usersService.deleteUser(userId);
    return users;
  }

  @Post('login')
  @ApiBearerAuth()
  @UseGuards(AppAuthGuard)
  @ApiOperation({ title: 'Authenticate' })
  @ApiResponse({ status: 200, description: 'Login Successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  public async login(@Req() req: Request, @Res() res: Response, @Session() session) {
    return res.status(HttpStatus.OK).send();
  }
}
