import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SchemaService } from '../../common/schema/schema.service';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from '../../common/helpers/hash-password.helper';

@Injectable()
export class UserService {

	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly schemaService: SchemaService) { }

	public async create(createUserDto: CreateUserDto): Promise<User> {

		const createdUser = this.userRepository.create(createUserDto);

		const passwordEncrypt = hashPassword(createdUser.password);

		createdUser.password = passwordEncrypt;

		this.validateUser(createdUser.email);

		this.createUserShema(createdUser.user_name);

		return this.userRepository.save(createdUser);
	}

	public findAll() {

		return this.userRepository.findAndCount();
	}

	public findOne(id: number) {

		return this.userRepository.findOne({ where: { id } });
	}

	public update(id: number, updateUserDto: UpdateUserDto): Promise<User> {

		const user = this.checkIfUserExists(id);

		this.validateUser(updateUserDto.email);

		if (user) {

			return this.userRepository.save(updateUserDto);
		}
	}

	public async remove(id: number) {

		const databaseUser = await this.userRepository.findOne({
			where: { id },
		});

		await this.schemaService.dropSchema(databaseUser.user_name);

		return this.userRepository.delete(databaseUser.id);
	}

	private async validateUser(userEmail: string) {

		const databaseUser = await this.userRepository.findOne({
			where: { email: userEmail },
		});

		if (databaseUser) {

			throw new BadRequestException('Já existe um usuário com este e-mail');
		}
	}

	private checkIfUserExists(id: number): boolean {

		const databaseUser = this.userRepository.findOneOrFail({
			where: { id: id },
		});

		if (!databaseUser) {

			throw new Error('Usuário não foi encontrado na base de dados');
		}

		return true;
	}

	private async createUserShema(userName: string) {

		return this.schemaService.createSchema(userName);
	}
}
