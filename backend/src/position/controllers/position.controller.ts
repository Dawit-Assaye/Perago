import { Observable } from 'rxjs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PositionService } from 'src/position/services/position.service';
import { Position } from 'src/models/position.interface';
import { PositionGuard } from '../guards/position.guard';
import { RootGuard } from '../guards/root.guard';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('position')
export class PositionController {
  constructor(private positionService: PositionService) {}

  //createCeo
  @Post('root')
    @UseGuards(RootGuard)
  createCeo(@Body() position: Position): Observable<Position> {
    return this.positionService.createPosition(position);
  }

  //createOther
  @Post('child/:id')
  @UseGuards(PositionGuard)
  createOther(@Body() position: Position): Observable<Position> {
    return this.positionService.createPosition(position);
  }

  // updateCeo
  @Put('root/:id')
  @UseGuards(RootGuard)
  updateCeo(
    @Param('id') id: string,
    @Body() position: Position,
  ): Observable<UpdateResult> {
    return this.positionService.updatePosition(id, position);
  }

  // updateOther
  @Put('child/:id')
  @UseGuards(PositionGuard)
  updateOther(
    @Param('id') id: string,
    @Body() position: Position,
  ): Observable<UpdateResult> {
    return this.positionService.updatePosition(id, position);
  }

  //get single position
  @Get(':id')
  singlePosition(@Param('id') id: string): Observable<Position> {
    return this.positionService.findSinglePosition(id);
  }

  //get childern
  @Get(':id/children')
  getChildrenPosition(@Param('id') id: string): Observable<Position[]> {
    return this.positionService.findChildrenPosition(id);
  }

  //get all positions
  @Get()
  allPositions(): Observable<Position[]> {
    return this.positionService.findAllPositions();
  }

  //Remove Position
  @Delete(':id')
  removePosition(@Param('id') id: string): Observable<DeleteResult> {
    return this.positionService.removePosition(id);
  }
}
