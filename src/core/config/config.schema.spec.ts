import {schema} from './config.schema';

describe("Config Schema", () => {
    let processEnv;
    beforeEach(() => {
        processEnv = JSON.parse(JSON.stringify(process.env)); //TODO: use cloneDeep from lodash
        process.env = {
            NODE_ENV: "test",
            BASE_URL: "http://localhost",
            MONGO_URI: "mongodb://mongo:27017/test",
            MONGO_MAX_POOL_SIZE: "4",
            MONGO_MIN_POOL_SIZE: "4",
        };
    });

    afterEach(() => {
        process.env = processEnv;
    });

    describe("BASE_URL", () => {
        it("should use default value if not defined", () => {
            expect(schema.validate(process.env).value["BASE_URL"]).toEqual(
                "http://localhost"
            );
        });

        it("should set value if defined", () => {
            delete process.env.BASE_URL;
            expect(schema.validate(process.env).value["BASE_URL"]).toEqual(
                "http://localhost"
            );
        });
    });

    describe("NODE_ENV", () => {
        it("should set the value if provided", () => {
            expect(schema.validate(process.env).value["NODE_ENV"]).toEqual("test");
        });

        it("should set the value if not defined", () => {
            delete process.env.NODE_ENV;
            expect(schema.validate(process.env).value["NODE_ENV"]).toEqual("dev");
        });
    });

    describe("PORT", () => {
        it("should use default if value is not defined", () => {
            // @ts-ignore
            process.env.PORT = 3210;
            expect(schema.validate(process.env).value["PORT"]).toEqual(3210);
        });

        it("should set value if defined", () => {
            delete process.env.PORT;
            expect(schema.validate(process.env).value["PORT"]).toEqual(3000);
        });
    });

    describe("MONGO", () => {
        describe("MONGO_URI", () => {
            it("should set value if defined", () => {
                process.env.MONGO_URI = "Bilbo";
                expect(schema.validate(process.env).value["MONGO_URI"]).toEqual(
                    "Bilbo"
                );
            });
        });

        describe("MONGO_MAX_POOL_SIZE", () => {
            it("should set value if defined", () => {
                process.env.MONGO_MAX_POOL_SIZE = "4";
                expect(schema.validate(process.env).value["MONGO_MAX_POOL_SIZE"]).toEqual(
                    4
                );
            });
        });

        describe("MONGO_MIN_POOL_SIZE", () => {
            it("should set value if defined", () => {
                process.env.MONGO_MIN_POOL_SIZE = "4";
                expect(schema.validate(process.env).value["MONGO_MIN_POOL_SIZE"]).toEqual(
                    4
                );
            });
        });
    });

    describe('LOG', () => {
        describe('LOG_LEVEL', () => {
            it('should use default value if not defined in the process.env', async () => {
                process.env.LOG_LEVEL = undefined;
                expect(schema.validate(process.env).value['LOG_LEVEL']).toEqual(
                    'debug',
                );
            });

            it('should set LOG_LEVEL value from process.env if its defined', async () => {
                process.env.LOG_LEVEL = 'info';
                expect(schema.validate(process.env).value['LOG_LEVEL']).toEqual('info');
            });
        });
    });

    describe('KAFKA', () => {
        describe('KAFKA_BROKER', () => {
            it('should use default value if not defined in the process.env', async () => {
                process.env.KAFKA_BROKER = undefined;
                expect(schema.validate(process.env).value['KAFKA_BROKER']).toEqual(
                    'localhost:9092',
                );
            });

            it('should set KAFKA_BROKER value from process.env if its defined', async () => {
                process.env.KAFKA_BROKER = 'localhost:3000';
                expect(schema.validate(process.env).value['KAFKA_BROKER']).toEqual('localhost:3000');
            });
        });

        describe('KAFKA_SLEEP_TIME', () => {
            it('should use default value if not defined in the process.env', async () => {
                process.env.KAFKA_SLEEP_TIME = undefined;
                expect(schema.validate(process.env).value['KAFKA_SLEEP_TIME']).toEqual(
                    5000,
                );
            });

            it('should set KAFKA_SLEEP_TIME value from process.env if its defined', async () => {
                process.env.KAFKA_SLEEP_TIME = '3000';
                expect(schema.validate(process.env).value['KAFKA_SLEEP_TIME']).toEqual(3000);
            });
        });
    });
});
