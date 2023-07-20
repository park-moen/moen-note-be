import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserRegisterDTO } from '../dtos/user-register.dto';
import { UserLoginDTO } from '../dtos/user-login.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('register')
  async userRegister(@Body() userRegisterDTO: UserRegisterDTO) {
    return await this.userService.userRegister(userRegisterDTO);
  }

  @Post('login')
  async userLogin(
    @Body() userLoginDTO: UserLoginDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { jwt, user } = await this.userService.userLogin(userLoginDTO);

    response.cookie('jwt', jwt, { httpOnly: true });

    return user;
  }
}
