import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, LoggerModule } from './core';
import { sLog } from './common/constants/slog.constant';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule
  ],
  controllers: [],
  providers: [ConfigService, sLog],
})
export class AppModule {}
