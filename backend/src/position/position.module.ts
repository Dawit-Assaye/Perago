import { Module } from '@nestjs/common';
import { PositionController } from './controllers/position/position.controller';
import { PositionService } from './services/position/position.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionEntity } from 'src/models/position.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([PositionEntity]), // Include the entity in forFeature
    // Other modules or providers if needed
  ],
  controllers: [PositionController],
  providers: [PositionService]
})
export class PositionModule {}
