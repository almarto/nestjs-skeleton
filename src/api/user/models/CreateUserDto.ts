import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  readonly firstName: string;

  @ApiModelProperty()
  readonly username: string;

  @ApiModelProperty()
  readonly password: string;
}
