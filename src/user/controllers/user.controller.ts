import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserRegisterDTO } from '../dtos/user-register.dto';
import { UserLoginDTO } from '../dtos/user-login.dto';
import { Response } from 'express';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { OnlyPrivateInterceptor } from 'src/common/interceptors/onyl-private.interceptor';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserDTO } from '../dtos/user.dto';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlyPrivateInterceptor)
  async getCurrentUser(@CurrentUser() currentUser: UserDTO) {
    return currentUser;
  }

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
