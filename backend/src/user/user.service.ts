import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';
import { User } from './model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    return await user.save();
  }

  async update(user: User, data: UpdateUserInput): Promise<User> {
    user.name = data.name !== undefined ? data.name : user.name;
    user.password = data.password !== undefined ? data.password : user.password;
    user.bio = data.bio !== undefined ? data.bio : user.bio;

    return await this.userRepository.save(user);
  }

  async delete(user: User): Promise<User> {
    return await this.userRepository.remove(user);
  }

  findOneById(id: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }

  findAll(page: number, limit: number): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder()
      .orderBy('created_at', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }
}
