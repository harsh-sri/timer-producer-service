import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";

@Injectable()
export class ConfigService extends NestConfigService {
    get mongo(): {
        uri: string;
        maxPoolSize: number;
        minPoolSize: number;
    } {
        return {
            uri: this.get("MONGO_URI"),
            maxPoolSize: Number(this.get("MONGO_MAX_POOL_SIZE")),
            minPoolSize: Number(this.get("MONGO_MIN_POOL_SIZE")),
        };
    }

    // TODO: could be an array of brokers
    get kafka(): {
        broker: string
    } {
        return {
            broker: this.get('KAFKA_BROKER')
        }
    }

    get log(): {
        name: string;
        level: string;
    } {
        return {
            name: this.get('LOG_NAME'),
            level: this.get('LOG_LEVEL'),
        };
    }
}
