import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindManyOptions, FindOptions } from 'typeorm';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public create(@Body() createUserDto: CreateUserDto) {

    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Param() options?: FindManyOptions) {
    return this.userService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
