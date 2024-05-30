import { Module } from '@nestjs/common';
import { KafkaModule } from 'src/kafka/kafka.module';
import { TimerService } from './services/timer.service';
import { ValidationPipe } from 'src/common/pipes';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimerEntity } from './entities/timer.entity';
import { ProducerService } from 'src/kafka/producer.service';
import { TimerController } from './controllers/timer.controller';

@Module({
  imports: [KafkaModule, TypeOrmModule.forFeature([TimerEntity])],
  controllers: [TimerController],
  providers: [TimerService, ValidationPipe, ProducerService],
})
export class TimerModule {}
