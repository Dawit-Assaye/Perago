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
import { AppService } from './app.service';
import { Position } from 'src/models/position.interface';
import { PositionGuard } from './position/guards/position.guard';
import { RootGuard } from './position/guards/root.guard';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('position')
export class AppController {
  constructor(private appService: AppService) {}

  //createCeo
  @Post('root')
  @UseGuards(RootGuard)
  createCeo(@Body() position: Position): Observable<Position> {
    return this.appService.createPosition(position);
  }

  //createOther
  @Post('child/:id')
  @UseGuards(PositionGuard)
  createOther(@Body() position: Position): Observable<Position> {
    return this.appService.createPosition(position);
  }

  // updateCeo
  @Put('root/:id')
  @UseGuards(RootGuard)
  updateCeo(
    @Param('id') id: string,
    @Body() position: Position,
  ): Observable<UpdateResult> {
    return this.appService.updatePosition(id, position);
  }

  // updateOther
  @Put('child/:id')
  @UseGuards(PositionGuard)
  updateOther(
    @Param('id') id: string,
    @Body() position: Position,
  ): Observable<UpdateResult> {
    return this.appService.updatePosition(id, position);
  }

  //get single position
  @Get('/findchild/:id')
  singlePosition(
    @Param('id') id: string,
  ): Observable<{ data: Position | null; message: string }> {
    return this.appService.findSinglePosition(id);
  }

  //get childern
  @Get(':id/children')
  getChildrenPosition(@Param('id') id: string): Observable<Position[]> {
    return this.appService.findChildrenPosition(id);
  }

  //get all positions
  @Get('list')
  allPositions(): Observable<Position[]> {
    return this.appService.findAllPositions();
  }

  //Remove Position
  @Delete(':id')
  removePosition(@Param('id') id: string): Observable<DeleteResult> {
    return this.appService.removePosition(id);
  }
}
