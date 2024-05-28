import { Test, TestingModule } from "@nestjs/testing";
import { cloneDeep } from "lodash";
import { ConfigService } from "./config.service";

describe("ConfigService", () => {
    let service: ConfigService;
    let processEnv;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ConfigService]
        }).compile();

        processEnv = cloneDeep(process.env);

        service = module.get<ConfigService>(ConfigService);
    });

    afterAll(() => {
        process.env = processEnv;
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe('MongoDB', () => {
        it('should return mongodb configuration from process.env', async () => {
            process.env.MONGO_URI = 'mongodb://mongo:27017/beep';
            process.env.MONGO_MAX_POOL_SIZE = '4';
            process.env.MONGO_MIN_POOL_SIZE = '1';
            expect(service.mongo).toEqual({
                uri: 'mongodb://mongo:27017/beep',
                maxPoolSize:4,
                minPoolSize:1,
            });
        });
    });

    describe('Logs', () => {
        it('should return log configuration from process.env', async () => {
            process.env.LOG_NAME = 'logs';
            process.env.LOG_LEVEL = 'info';

            expect(service.log).toEqual({
                name: 'logs',
                level: 'info',
            });
        });
    });

    describe('Kafka', () => {
        it('should return log configuration from process.env', async () => {
            process.env.KAFKA_BROKER = 'localhost:3000';
            process.env.KAFKA_SLEEP_TIME = '200';

            expect(service.kafka).toEqual({
                broker: 'localhost:3000',
                sleepTime: '200'
            });
        });
    });
});
