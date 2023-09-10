import { Module } from '@nestjs/common';
import { AuthController } from './presenter/auth.controller';
import { AuthService } from './domain/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { authConfig } from '../../config/auth.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: authConfig.jwt.secret,
      signOptions: {
        expiresIn: authConfig.jwt.expiresIn,
      },
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
