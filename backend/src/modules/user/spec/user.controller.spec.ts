import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const userList = [
    {
      id: 1,
      user_name: 'john_doe',
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      user_name: 'john_two',
      name: 'John Two',
      email: 'john_two@gmail.com',
      password: '123456',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      user_name: 'john_three',
      name: 'John Three',
      email: 'john_three@gmail.com',
      password: '123456',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ] as User[];

  const userEntity = {
    user_name: 'john_doe',
    name: 'John Doe',
    email: 'john@yahoo.com',
    password: 'secretPassword',
    created_at: new Date(),
    updated_at: new Date(),
    id: 1,
  } as User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValueOnce(userList),
            findOne: jest.fn().mockResolvedValueOnce(userEntity),
            create: jest.fn().mockResolvedValueOnce(userEntity),
            update: jest.fn().mockResolvedValueOnce(userEntity),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('FindAll', () => {
    it('should return an array of users sucessfully', async () => {
      const result = await userController.findAll();

      expect(userService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(userList);
      expect(typeof result).toBe('object');
    });

    it('should throw an error when trying to get all users', async () => {
      jest.spyOn(userController, 'findAll').mockRejectedValueOnce(new Error());

      expect(userController.findAll()).rejects.toThrow();
    });
  });

  describe('FindOne', () => {
    it('should return a user successfully', async () => {
      const result = await userController.findOne(1);

      expect(userService.findOne).toHaveBeenCalledTimes(1);
      expect(userService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(userEntity);
    });

    it('should throw an error when trying to get a user', async () => {
      jest.spyOn(userController, 'findOne').mockRejectedValueOnce(new Error());

      expect(userController.findOne(1)).rejects.toThrow();
    });
  });

  describe('Create', () => {
    it('should create a new user', async () => {
      const input = {
        user_name: 'john_doe',
        name: 'John Doe',
        email: 'john@yahoo.com',
        password: 'secretPassword',
      } as CreateUserDto;

      const result = await userController.create(input);

      expect(result).toEqual(userEntity);
      expect(userService.create).toHaveBeenCalledTimes(1);
      expect(userService.create).toHaveBeenCalledWith(input);
    });

    it('should throw an error', async () => {
      const input = {
        user_name: 1,
        name: 2,
        email: 3,
        password: 4,
      };

      jest.spyOn(userController, 'create').mockRejectedValueOnce(new Error());

      const result = userController.create(input as any);

      expect(result).rejects.toThrow();
    });
  });

  describe('Update', () => {
    it('should update an existing user', async () => {
      const input = {
        user_name: 'john_doe',
        name: 'John Doe Updated',
        email: 'john@yahoo.com',
      };

      userEntity.name = 'John Doe Updated';

      const result = await userController.update(1, input);

      expect(result).toEqual(userEntity);
      expect(userService.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', async () => {
      const input = {
        user_name: 1,
        name: 2,
        email: 3,
      };

      jest.spyOn(userController, 'update').mockRejectedValueOnce(new Error());

      const result = userController.update(1, input as any);

      expect(result).rejects.toThrow();
    });
  });

  describe('Remove', () => {
    it('should remove a user successfully', async () => {
      const result = await userController.remove(1);

      expect(userService.remove).toHaveBeenCalledTimes(1);
      expect(userService.remove).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });

    it('should throw an error', async () => {
      jest.spyOn(userController, 'remove').mockRejectedValueOnce(new Error());

      const result = userController.remove(1);

      expect(result).rejects.toThrow();
    });
  });
});
