import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { emailReg } from 'src/common/emailReg';
import { GitHubLib } from 'src/lib/gitHub.lib';
import { MailerService } from 'src/mailer/mailer.service';
import { Repository } from 'typeorm';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';
import { GitHubUser } from './dto/user.object';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private mailerService: MailerService,
    private gitHubLib: GitHubLib,
  ) {}

  async create(data: CreateUserInput): Promise<User> {
    if (!emailReg.test(data.email)) {
      throw new BadRequestException('Invalid email.');
    }

    const mailer = await this.mailerService.findOneByEmail(data.email);

    if (!mailer || !mailer.is_verified) {
      throw new UnauthorizedException('Unverified email.');
    }

    const existUser = await this.findOneByEmail(data.email);

    if (existUser) {
      throw new ConflictException('User already exist.');
    }

    return await this.userRepository.create(data).save();
  }

  async update(user: User, data: UpdateUserInput): Promise<User> {
    user.name = data.name || user.name;
    user.password = data.password || user.password;
    user.bio = data.bio || user.bio;

    return await this.userRepository.save(user);
  }

  async delete(user: User): Promise<User> {
    return await this.userRepository.remove(user);
  }

  async match(email: string, password: string): Promise<User> {
    if (!emailReg.test(email)) {
      throw new BadRequestException('Invalid email.');
    }

    const user = await this.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (password !== user.password) {
      throw new NotFoundException('Invalid password.');
    }

    return user;
  }

  async user(idx: number): Promise<User> {
    const user = await this.findOneByIdx(idx);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async users(page: number, limit: number): Promise<User[]> {
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Invalid page or limit.');
    }

    const users = await this.findAll(page, limit);

    return users;
  }

  async gitHubUser(code: string): Promise<GitHubUser> {
    const accessToken = await this.gitHubLib.getGitHubAccessToken(code);

    const user = await this.gitHubLib.getGitHubUser(accessToken);

    if (user === null) {
      throw new NotFoundException('User not found.');
    }

    if (user.email) {
      await this.mailerService.create(user.email, true);
    }

    return user;
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .getOne();
  }

  findOneByIdx(idx: number): Promise<User> {
    return this.userRepository
      .createQueryBuilder()
      .where('idx = :idx', { idx })
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
