import { Module } from '@nestjs/common';
import { SchemaService } from './schema.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule],
  providers: [SchemaService],
  exports: [SchemaService],
})
export class SchemaModule {}
