import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  // 모든 게시물 가져오기
  @Get('/')
  getAllBoards() {
    return this.boardsService.getAllBoards();
  }
}
