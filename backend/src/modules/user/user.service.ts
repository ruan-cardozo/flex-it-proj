import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindManyOptions, FindOptions, FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SchemaService } from 'src/common/schema/schema.service';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/common/helpers/hash-password.helper';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly schemaService:  SchemaService
  ) {}

  public async create(createUserDto: CreateUserDto) {

    const databaseUser = this.userRepository.create(createUserDto);

    const passwordEncrypt = hashPassword(databaseUser.password);

    databaseUser.password = passwordEncrypt;

    this.validateUser(createUserDto);

    this.createUserShema(createUserDto);

    return await this.userRepository.save(databaseUser);
  }

  public findAll(options?: FindManyOptions<User>) {

    const queryBuilder = this.userRepository.createQueryBuilder('user');
    
    if (options) {
      
        queryBuilder.where(options.where);  
    }

    return queryBuilder.getManyAndCount();
  }

  public findOne(id: number) {

    return this.userRepository.findOne({where: { id }});
  }

  update(id: number, updateUserDto: UpdateUserDto) {

    return `This action updates a #${id} user`;
  }

  public async remove(id: number) {

    const databaseUser = await this.userRepository.findOne({where: { id }});

    await this.schemaService.dropSchema(databaseUser.user_name);

    return await this.userRepository.delete(databaseUser.id);
  }

  private async validateUser(user: CreateUserDto) {

    const databaseUser = await this.userRepository.findOne({ where: { email: user.email }});

    if (databaseUser) {

      throw new BadRequestException('Já existe um usuário com este e-mail');
    }
  }

  private async createUserShema(user: CreateUserDto) {

    return  this.schemaService.createSchema(user.user_name);
  }
}
