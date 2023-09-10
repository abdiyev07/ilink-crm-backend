import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../domain/auth.service';
import { authConfig } from '../../../config/auth.config';
import { UserEntity } from '../../../common/entities/user.entity';
import { JwtPayload } from '../helpers/auth.helper';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.jwt.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    return await this.authService.validateUser(payload);
  }
}
