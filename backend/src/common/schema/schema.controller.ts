import { Controller, Post, Body } from '@nestjs/common';
import { SchemaService } from './schema.service';

@Controller('schemas')
export class SchemaController {
    constructor(private readonly schemaService: SchemaService) {}

    @Post()
    async createSchema(@Body('schemaName') schemaName: string) {
        await this.schemaService.createSchema(schemaName);
        return { message: `Schema ${schemaName} created successfully` };
    }

    @Post('drop')
    async dropSchema(@Body('schemaName') schemaName: string) {
        await this.schemaService.dropSchema(schemaName);
        return { message: `Schema ${schemaName} dropped successfully` };
    }
}
