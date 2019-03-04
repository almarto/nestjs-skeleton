import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { {{pascalCase name}}sController } from './{{camelCase name}}.controller';
import { {{pascalCase name}}sService } from './{{camelCase name}}.service';
import { {{pascalCase name}} } from './{{camelCase name}}.entity';

@Module({
  imports: [TypeOrmModule.forFeature([{{pascalCase name}}])],
  controllers: [{{pascalCase name}}sController],
  providers: [{{pascalCase name}}sService],
})
export class {{pascalCase name}}sModule {}
