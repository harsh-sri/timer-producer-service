import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, LoggerModule } from './core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
