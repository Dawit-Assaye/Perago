import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from,Observable } from 'rxjs';
import { PositionEntity } from 'src/models/position.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Position } from 'src/models/position.interface';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(PositionEntity)
    private readonly positionRepository: Repository<PositionEntity>,
  ) {}

  createPosition(position: Position): Observable<Position> {
    return from(this.positionRepository.save(position));
  }

  updatePosition(id:string,position:Position): Observable<UpdateResult> {
    return from(this.positionRepository.update(id, position));
  }

findSinglePosition(id:string):Observable<Position | null>{
    return from(this.positionRepository.findOneBy({ id }));
}

findChildrenPosition(id: string): Observable<Position[] | null>{
    return from(this.positionRepository.find({
        where: { parent_id: id },
    }))
    }
    
    findAllPositions(): Observable<Position[]> {
        return from(this.positionRepository.find());
    }

    removePosition(id: string): Observable<DeleteResult>{
            return from(this.positionRepository.delete(id))
          }
}
