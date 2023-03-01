import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';
import { Position } from '../entity/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  providers: [PositionService],
  exports: [PositionService],
  controllers: [PositionController],
})
export class PositionModule {}
