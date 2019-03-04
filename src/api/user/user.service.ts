import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { AppErrorTypeEnum } from 'src/common/error/AppErrorTypeEnum';
import { AppError } from 'src/common/error/AppError';

import { CreateUserDto } from './models/CreateUserDto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(userId: string): Promise<User> {
    const userFound = await this.userRepository.findOne(userId);

    if (!userFound) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return userFound;
  }

  async addUser(user: CreateUserDto): Promise<User> {
    const existentUser = await this.userRepository.findOne({
      username: user.username,
    });

    if (existentUser) {
      throw new AppError(
        AppErrorTypeEnum.ALREADY_EXISTS,
        'User',
        `The username ${user.username} already in use`,
      );
    }

    return await this.userRepository.save(user);
  }

  async updateUser(
    userId: string,
    user: DeepPartial<CreateUserDto>,
  ): Promise<User> {
    const userToUpdate = await this.userRepository.findOne(userId);

    if (!userToUpdate) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return this.userRepository.save({ ...userToUpdate, ...user });
  }

  async deleteUser(userId: string): Promise<User> {
    const userToRemove = await this.userRepository.findOne(userId);

    if (!userToRemove) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return this.userRepository.remove(userToRemove);
  }
}