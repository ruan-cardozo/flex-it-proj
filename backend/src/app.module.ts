import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { SchemaModule } from './common/schema/schema.module';
import { MetricsModule } from './modules/metrics/metrics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    UserModule,
    SchemaModule,
    MetricsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
