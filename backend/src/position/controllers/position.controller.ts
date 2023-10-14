import { Observable } from 'rxjs';
import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PositionService } from 'src/position/services/position.service';
import { Position } from 'src/models/position.interface';
import { PositionGuard } from '../position.guard';
import { UpdateResult } from 'typeorm';

@Controller('position')
export class PositionController {
  constructor(private positionService: PositionService) {}

  //createCeo
  @Post('root')
  createCeo(@Body() position: Position): Observable<Position> {
    return this.positionService.createPosition(position);
  }

  //createOther
  @Post('child')
  @UseGuards(PositionGuard)
  createOther(@Body() position: Position): Observable<Position> {
    return this.positionService.createPosition(position);
  }

  // updateCeo
  @Put('root/:id')
  updateCeo(
    @Param('id') id: number,
    @Body() position: Position,
  ): Observable<UpdateResult> {
    return this.positionService.updatePosition(id, position);
  }

  // updateOther
  @Put('child/:id')
  @UseGuards(PositionGuard)
  updateOther(
    @Param('id') id: number,
    @Body() position: Position,
  ): Observable<UpdateResult> {
    return this.positionService.updatePosition(id, position);
  }

  //get single position
  @Get(":id")
  singlePosition(@Param('id') id: number):Observable<Position>{
    return this.positionService.findSinglePosition(id)
  }

  //get all positions
  @Get()
  allPositions(): Observable<Position[]> {
    return this.positionService.findAllPositions();
  }
}
