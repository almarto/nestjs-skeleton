import { ApiModelProperty } from '@nestjs/swagger';

export class DeleteBooksQuery {
  @ApiModelProperty()
  bookId: string;
}
