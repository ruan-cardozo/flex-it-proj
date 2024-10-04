import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class SchemaService {
  constructor(@InjectDataSource() private readonly connection: DataSource) {}

  public async createSchema(schemaName: string): Promise<void> {
    await this.connection.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}_db`);
  }

  public async dropSchema(schemaName: string): Promise<void> {
    await this.connection.query(
      `DROP SCHEMA IF EXISTS ${schemaName}_db CASCADE`,
    );
  }
}
