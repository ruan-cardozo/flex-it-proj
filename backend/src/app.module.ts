import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { SchemaController } from './common/schema/schema.controller';
import { SchemaModule } from './common/schema/schema.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options), 
    UserModule, 
    SchemaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
