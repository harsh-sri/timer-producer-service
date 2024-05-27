import * as Joi from "joi";
import { LogLevel } from "src/common/enums/log-level.enum";

export const schema = Joi.object({
    NODE_ENV: Joi.string()
        .valid("test", "dev", "prod")
        .default("dev"),
    PORT: Joi.number().default(3000),
    BASE_URL: Joi.string().default("http://localhost"),
    // MongoDB
    MONGO_URI: Joi.string().required(),
    MONGO_MIN_POOL_SIZE: Joi.number().default(5),
    MONGO_MAX_POOL_SIZE: Joi.number().default(10),
    
    // Kafka
    KAFKA_BROKER: Joi.string().default('localhost:9092'),

    // Logger

    LOG_NAME: Joi.string()
        .description('name of the log')
        .default('timer-producer'),
    LOG_LEVEL: Joi.string()
        .valid(
            LogLevel.Info,
            LogLevel.Debug,
            LogLevel.Error,
            LogLevel.Trace,
            LogLevel.Warn,
        )
        .default(LogLevel.Debug),
});
