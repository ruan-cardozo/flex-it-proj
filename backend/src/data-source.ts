import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "172.18.0.4",
    port: 5432,
    username: "node",
    password: "node",
    database: "flex-it-database",
    synchronize: true,
    logging: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    subscribers: [],
})