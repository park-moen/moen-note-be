import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      secretOrPrivateKey: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [JwtStrategy, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
