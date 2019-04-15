import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { createHmac } from 'crypto';

import { AppErrorTypeEnum } from 'src/common/error/AppErrorTypeEnum';
import { AppError } from 'src/common/error/AppError';
import { BookEntity } from '../book';

import { CreateUserDto } from './models';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUser(userId: number): Promise<UserEntity> {
    const userFound = await this.userRepository.findOne(userId);

    if (!userFound) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return userFound;
  }

  async addUser(user: CreateUserDto): Promise<UserEntity> {
    let u: UserEntity;
    u = await this.userRepository.findOne({
      username: user.username,
    });

    if (u) {
      throw new AppError(
        AppErrorTypeEnum.ALREADY_EXISTS,
        'User',
        `The username ${user.username} already in use`,
      );
    }

    u = new UserEntity();
    Object.assign(u, user);
    return this.userRepository.save(u);
  }

  async updateUser(userId: number, user: DeepPartial<CreateUserDto>): Promise<UserEntity> {
    const userToUpdate = await this.userRepository.findOne(userId);

    if (!userToUpdate) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return this.userRepository.save({ ...userToUpdate, ...user });
  }

  async deleteUser(userId: number): Promise<UserEntity> {
    const userToRemove = await this.userRepository.findOne(userId);

    if (!userToRemove) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return this.userRepository.remove(userToRemove);
  }

  async authenticateUser({
    username,
    password,
  }: {
    username: string
    password: string,
  }): Promise<UserEntity> {
    let u: UserEntity;
    u = await this.userRepository.findOne({
      select: ['id', 'username', 'passwordHash'],
      where: { username },
    });

    const passHash = createHmac('sha256', password).digest('hex');
    if (u.passwordHash === passHash) {
      delete u.passwordHash;
      return u;
    }
  }
}
