import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createToken } from 'src/lib/token';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';
import { User } from './model/user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async registerUser(data: CreateUserInput): Promise<string> {
    const isExist = await this.userRepository.findOneById(data.id);

    if (isExist) {
      throw new ConflictException('User already exist.');
    }

    const user = this.userRepository.create(data);

    user.id = data.id;
    user.password = data.password;

    await this.userRepository.save(user);

    return createToken(user);
  }

  async loginUser(id: string, password: string): Promise<string> {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const isMatch = password === user.password;

    if (isMatch) {
      return createToken(user);
    } else {
      throw new NotFoundException('Invalid password.');
    }
  }

  async getAllUsers(page: number, limit: number): Promise<User[]> {
    if (!page || !limit) {
      throw new BadRequestException('Page or limit is null.');
    }

    if (page < 1) {
      throw new BadRequestException('Page is invalid number');
    }

    const users = await this.userRepository.findAll(page, limit);

    return users;
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    user.name = data.name !== undefined ? data.name : user.name;
    user.password = data.password !== undefined ? data.password : user.password;

    return await this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return await this.userRepository.remove(user);
  }
}
