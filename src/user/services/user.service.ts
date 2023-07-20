import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserRegisterDTO } from '../dtos/user-register.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
}
