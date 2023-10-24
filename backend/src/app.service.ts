import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, of } from 'rxjs';
import { PositionEntity } from 'src/models/position.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Position } from 'src/models/position.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(PositionEntity)
    private readonly positionRepository: Repository<PositionEntity>,
  ) {}

  createPosition(position: Position): Observable<Position> {
    return from(this.positionRepository.save(position));
  }

  updatePosition(id: string, position: Position): Observable<UpdateResult> {
    return from(this.positionRepository.update(id, position));
  }


  findSinglePosition(
    id: string,
  ): Observable<{ data: Position | null; message: string }> {
    return from(this.positionRepository.findOneBy({ id })).pipe(
      map((position: Position | null) => {
        if (position) {
          return { data: position, message: 'Position found' };
        } else {
          return { data: null, message: 'Position not found' };
        }
      }),
      catchError((error) => {
        // Handle any errors, if necessary
        return of({ data: null, message: 'Error occurred' });
      }),
    );
  }

  
  findChildrenPosition(id: string): Observable<Position[] | null> {
    return from(
      this.positionRepository.find({
        where: { parent_id: id },
      }),
    );
  }

  findAllPositions(): Observable<Position[]> {
    return from(this.positionRepository.find());
  }

 async removePosition(id: string): Promise<void> {
    // Delete the current position by ID
    await this.positionRepository.delete(id);

    // Find all children with a matching parent_id
    const children = await this.positionRepository.find({ where: { parent_id: id } });

    // Recursively remove children
    for (const child of children) {
      await this.removePosition(child.id); // Recursive call to remove children
    }
  }

}
