import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { emailReg } from 'src/common/emailReg';
import { IGitHubUser } from 'src/lib/github/github.interface';
import { GitHubLib } from 'src/lib/github/github.lib';
import { Mailer } from 'src/module/mailer/mailer.entity';
import { MailerRepository } from 'src/module/mailer/mailer.repository';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private mailerRepository: MailerRepository,
    private gitHubLib: GitHubLib,
  ) {}

  async create(data: CreateUserInput): Promise<User> {
    if (!emailReg.test(data.email)) {
      throw new BadRequestException('Invalid email.');
    }

    const mailer: Mailer = await this.mailerRepository.findOneByEmail(
      data.email,
    );

    if (!mailer || !mailer.is_verified) {
      throw new UnauthorizedException('Unverified email.');
    }

    const existUser: User = await this.userRepository.findOneByEmail(
      data.email,
    );

    if (existUser) {
      throw new ConflictException('User already exist.');
    }

    await mailer.remove();

    return await this.userRepository.create(data).save();
  }

  async update(user: User, data: UpdateUserInput): Promise<User> {
    user.avatar = data.avatar || user.avatar;
    user.name = data.name || user.name;
    user.password = data.password || user.password;
    user.bio = data.bio || user.bio;

    return await this.userRepository.save(user);
  }

  async delete(user: User): Promise<User> {
    return await this.userRepository.remove(user);
  }

  async match(email: string, password: string): Promise<User> {
    const user: User = await this.userRepository.findOneByEmailAndPassword(
      email,
      password,
    );

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async user(idx: number): Promise<User> {
    const user: User = await this.userRepository.findOneByIdx(idx);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async users(page: number, limit: number): Promise<User[]> {
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Invalid page or limit.');
    }

    const users: User[] = await this.userRepository.findAll(page, limit);

    return users;
  }

  async gitHubAuth(code: string): Promise<User> {
    const accessToken: string = await this.gitHubLib.getGitHubAccessToken(code);

    const gitHubUser: IGitHubUser = await this.gitHubLib.getGitHubUser(
      accessToken,
    );

    if (gitHubUser === null) {
      throw new NotFoundException('User not found.');
    }

    const existUser: User = await this.userRepository.findOneByGitHubId(
      gitHubUser.github_id,
    );

    if (existUser) {
      return existUser;
    }

    return this.userRepository.create(gitHubUser).save();
  }

  async findUserByEmailOrGitHubId(decodedUser: User): Promise<User> {
    let user: User;

    if (decodedUser.github_id) {
      user = await this.userRepository.findOneByGitHubId(decodedUser.github_id);
    } else {
      user = await this.userRepository.findOneByEmail(decodedUser.email);
    }

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
