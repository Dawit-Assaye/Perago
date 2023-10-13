import {Request,} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Body, Controller, Post } from '@nestjs/common';
import { PositionService } from 'src/position/services/position/position.service';
import { Position } from 'src/models/position.interface';

@Controller('position')
export class PositionController {
    constructor(private positionService: PositionService) { }
 
    @Post()
    create(@Body() position: Position, @Request() req): Observable<Position>{
        return this.positionService.createPosition(position);
    }

}
