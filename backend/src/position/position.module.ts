import { Module } from '@nestjs/common';
import { PositionController } from './controllers/position.controller';
import { PositionService } from './services/position.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionEntity } from 'src/models/position.entity';
// import { DataSource } from 'typeorm';
@Module({
  imports: [
    TypeOrmModule.forFeature([PositionEntity]), // Include the entity in forFeature
  ],
  controllers: [PositionController],
  providers: [PositionService],
})
export class PositionModule {
  // constructor(private dataSource: DataSource) {
  //   console.log(dataSource.toString());
  // }
}
