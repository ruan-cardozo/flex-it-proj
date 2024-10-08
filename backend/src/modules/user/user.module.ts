import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SchemaModule } from 'src/common/schema/schema.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigCatService } from '../feature-flag/feature-flag.service';
import { FeatureFlagGuard } from '../feature-flag-guard/feature-flag.guard';

@Module({
	imports: [TypeOrmModule.forFeature([User]), SchemaModule],
	controllers: [UserController],
	providers: [UserService, ConfigCatService, FeatureFlagGuard],
	exports: [UserModule]
})
export class UserModule {}
