import { ApiModelProperty } from '@nestjs/swagger';

export class DeleteBookQuery {
  @ApiModelProperty()
  bookId: string;
}
