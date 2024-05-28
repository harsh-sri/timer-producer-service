import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, LoggerModule } from './core';
import { sLog } from './common/constants/slog.constant';
import { HealthCheckModule } from './health-check/health-check.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule,
    HealthCheckModule
  ],
  controllers: [],
  providers: [ConfigService, sLog],
})
export class AppModule {}
