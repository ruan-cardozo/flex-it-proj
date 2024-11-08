import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
	UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FeatureFlagGuard } from '../feature-flag-guard/feature-flag.guard';
import { IsPublic } from 'src/common/decorators/is-public.decorator';

@Controller('/v1/users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	public findAll() {

		return this.userService.findAll();
	}

	@Get(':id')
	public findOne(@Param('id') id: number) {

		return this.userService.findOne(id);
	}

	@Post()
	@IsPublic()
	@UseGuards(FeatureFlagGuard)
	public create(@Body() createUserDto: CreateUserDto) {

		return this.userService.create(createUserDto);
	}

	@Put(':id')
	public update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {

		return this.userService.update(id, updateUserDto);
	}

	@Delete(':id')
	public remove(@Param('id') id: number) {

		return this.userService.remove(id);
	}
}
