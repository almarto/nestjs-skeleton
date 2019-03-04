import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { {{pascalCase name}} } from './{{camelCase name}}.entity';
import { Create{{pascalCase name}}Dto } from './models/Create{{pascalCase name}}Dto';

@Injectable()
export class {{pascalCase name}}sService {
  constructor(
    @InjectRepository({{pascalCase name}})
    private readonly {{camelCase name}}Repository: Repository<{{pascalCase name}}>,
  ) { }

  async get{{pascalCase name}}s(): Promise<{{pascalCase name}}[]> {
    return this.{{camelCase name}}Repository.find();
  }

  async get{{pascalCase name}}({{camelCase name}}Id: string): Promise<{{pascalCase name}}> {
    const {{camelCase name}}Found = await this.{{camelCase name}}Repository.findOne({{camelCase name}}Id);

    if (!{{camelCase name}}Found) {
      throw new NotFoundException(`{{pascalCase name}} with id ${ {{camelCase name}}Id } not found`);
    }

    return {{camelCase name}}Found;
  }

  async add{{pascalCase name}}({{camelCase name}}: Create{{pascalCase name}}Dto): Promise<{{pascalCase name}}> {
    return this.{{camelCase name}}Repository.save({{camelCase name}});
  }

  async update{{pascalCase name}}(
    {{camelCase name}}Id: string,
    {{camelCase name}}: DeepPartial<Create{{pascalCase name}}Dto>,
  ): Promise<{{pascalCase name}}> {
    const {{camelCase name}}ToUpdate = await this.{{camelCase name}}Repository.findOne({{camelCase name}}Id);

    if (!{{camelCase name}}ToUpdate) {
      throw new NotFoundException(`{{pascalCase name}} with id ${ {{camelCase name}}Id } not found`);
    }

    return this.{{camelCase name}}Repository.save({ ...{{camelCase name}}ToUpdate, ...{{camelCase name}} });
  }

  async delete{{pascalCase name}}({{camelCase name}}Id: string): Promise<{{pascalCase name}}> {
    const {{camelCase name}}ToRemove = await this.{{camelCase name}}Repository.findOne({{camelCase name}}Id);

    if (!{{camelCase name}}ToRemove) {
      throw new NotFoundException(`{{pascalCase name}} with id ${ {{camelCase name}}Id } not found`);
    }

    return this.{{camelCase name}}Repository.remove({{camelCase name}}ToRemove);
  }
}
