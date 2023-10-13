import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from,Observable } from 'rxjs';
import { PositionEntity } from 'src/models/position.entity';
import { Repository } from 'typeorm';
import { Position } from 'src/models/position.interface';

@Injectable()
export class PositionService {
    constructor(
        @InjectRepository(PositionEntity)
        private readonly positionRepository: Repository<PositionEntity>,
    ) { }
    
    createPosition(position:Position): Observable<Position>{
        return from(this.positionRepository.save(position));
    }

}
