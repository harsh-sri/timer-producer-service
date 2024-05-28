import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, LoggerModule } from './core';
import { sLog } from './common/constants/slog.constant';
import { HealthCheckModule } from './health-check/health-check.module';
import { KafkaModule } from './kafka/kafka.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "mongodb",
        url: configService.mongo.uri,
        useNewUrlParser: true,
        minPoolSize: configService.mongo.minPoolSize,
        maxPoolSize: configService.mongo.maxPoolSize,
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        useUnifiedTopology: true
      }),
      inject: [ConfigService]
    }),
    LoggerModule,
    HealthCheckModule,
    KafkaModule
  ],
  controllers: [],
  providers: [ConfigService, sLog],
})
export class AppModule {}
