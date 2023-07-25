import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserRegisterDTO } from '../dtos/user-register.dto';
import * as bcrypt from 'bcrypt';
import { UserLoginDTO } from '../dtos/user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../dtos/user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async userRegister(userRegisterDTO: UserRegisterDTO): Promise<void> {
    const { email, password } = userRegisterDTO;
    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new UnauthorizedException('해당하는 이메일은 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userRepository.save({
      ...userRegisterDTO,
      password: hashedPassword,
    });
  }

  async userLogin(
    userLoginDTO: UserLoginDTO,
  ): Promise<{ jwt: string; user: UserDTO }> {
    const { email, password } = userLoginDTO;
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('해당하는 이멜일은 존재하지 않습니다.');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('로그인에 실패했습니다.');
    }

    try {
      const jwt = await this.jwtService.signAsync(
        { sub: user.id },
        { secret: this.configService.get('SECRET_KEY') },
      );

      return { jwt, user };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findUserById(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id: Number(id) });

      if (!user) throw new Error();

      return user;
    } catch (error) {
      throw new BadRequestException('해당하는 사용자를 찾을 수 없습니다.');
    }
  }
}
