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

import { Create{{pascalCase name}}Dto } from './models/Create{{pascalCase name}}Dto';
import { {{pascalCase name}}sService } from './{{camelCase name}}.service';

@ApiUseTags('{{camelCase name}}s')
@Controller('{{camelCase name}}s')
export class {{pascalCase name}}sController {
  constructor(private {{camelCase name}}sService: {{pascalCase name}}sService) {}

  @Get()
  @ApiResponse( { status: 200, description: '{{camelCase name}}s Found.' } )
  public async get{{pascalCase name}}s() {
    const {{camelCase name}}s = await this.{{camelCase name}}sService.get{{pascalCase name}}s();
    return {{camelCase name}}s;
  }

  @Get( ':{{camelCase name}}Id' )
  @ApiResponse( { status: 200, description: '{{camelCase name}} Found.' } )
  @ApiResponse( { status: 404, description: 'No {{camelCase name}} found.' } )
  public async get{{pascalCase name}}(@Param('{{camelCase name}}Id') {{camelCase name}}Id: string) {
    const {{camelCase name}} = await this.{{camelCase name}}sService.get{{pascalCase name}}({{camelCase name}}Id);
    return {{camelCase name}};
  }

  @Post()
  @ApiResponse( { status: 200, description: '{{camelCase name}} Created.' } ))
  public async add{{pascalCase name}}(@Body() {{camelCase name}}: Create{{pascalCase name}}Dto) {
    const created{{pascalCase name}} = await this.{{camelCase name}}sService.add{{pascalCase name}}({{camelCase name}});
    return created{{pascalCase name}};
  }

  @Put( ':{{camelCase name}}Id' )
  @ApiResponse( { status: 200, description: '{{camelCase name}} Updated.' } )
  @ApiResponse( { status: 404, description: 'No {{camelCase name}} found.' } )
  public async update{{pascalCase name}}(
    @Param('{{camelCase name}}Id') {{camelCase name}}Id: string,
    @Body() {{camelCase name}}: Create{{pascalCase name}}Dto,
  ) {
    const created{{pascalCase name}} = await this.{{camelCase name}}sService.update{{pascalCase name}}({{camelCase name}}Id, {{camelCase name}});
    return created{{pascalCase name}};
  }

  @Delete()
  @ApiResponse( { status: 200, description: '{{camelCase name}} Deleted.' } )
  @ApiResponse( { status: 404, description: 'No {{camelCase name}} found.' } )
  public async delete{{ pascalCase name }}(@Param('{{camelCase name}}Id') {{camelCase name}}Id: string) {
    const {{camelCase name}}s = await this.{{camelCase name}}sService.delete{{pascalCase name}}({{camelCase name}}Id);
    return {{camelCase name}}s;
  }
}