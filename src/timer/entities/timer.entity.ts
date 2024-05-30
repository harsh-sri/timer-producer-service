import { UUID } from 'bson';
import { IsDate, IsDefined, IsEnum, IsInt, IsString } from 'class-validator';
import { TimerStatus } from 'src/common/enums/timer-status.enum';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('timer')
export class TimerEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  timerId: UUID;

  @Column()
  @IsDefined()
  @IsString()
  webhookUrl: string;

  @Column()
  @IsDefined()
  @IsInt()
  expiryTime: Date;

  @IsEnum(TimerStatus)
  @IsDefined()
  timerStatus: TimerStatus;

  @Column()
  @IsDate()
  @IsDefined()
  createdAt: Date;
}
