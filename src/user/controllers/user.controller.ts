import { Body, Controller, Logger, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDTO } from '../dtos/user-register.dto';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @Post('signup')
  async userRegister(@Body() userRegisterDTO: UserRegisterDTO) {
    return await this.userService.userRegister(userRegisterDTO);
  }
}
