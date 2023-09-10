import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from '../helpers/auth.helper';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../../common/entities/user.entity';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}
  async validateUser(payload: JwtPayload) {
    const user = await this.usersService.findUserById(payload.id);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
  async login(loginDto: LoginDto): Promise<string> {
    const user = await this.usersService.findUserByPhone(loginDto.phone_number);
    if (!user) throw new HttpException('Пользователь с таким номером не зарегистрирован', HttpStatus.BAD_REQUEST);
    const arePasswordsEqual = await this._comparePasswords(loginDto.password, user.password);
    if (!arePasswordsEqual) {
      throw new HttpException('Введен неверный пароль', HttpStatus.BAD_REQUEST);
    }
    return this._createToken(user);
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findUserByPhone(registerDto.phone_number);
    if (user) {
      throw new HttpException('Пользователь с таким номером уже зарегистрирован', HttpStatus.BAD_REQUEST);
    }
    return await this.usersService.createUser(registerDto);
  }

  private _createToken(user: UserEntity) {
    return this.jwtService.sign({ id: user.id });
  }

  private async _comparePasswords(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
