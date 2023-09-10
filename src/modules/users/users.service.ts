import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../common/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepo: Repository<UserEntity>,
  ) {}

  public async findUserById(user_id: number) {
    return await this.usersRepo.findOne({ where: { id: user_id } });
  }

  async findUserByPhone(phone: string): Promise<UserEntity | undefined> {
    return await this.usersRepo.findOne({ where: { phone_number: phone } });
  }

  async createUser(payload: RegisterDto) {
    const user = this.usersRepo.create({ ...payload });
    const { id } = await this.usersRepo.save(user);
    const newUser = await this.usersRepo.findOne({ where: { id } });
    delete newUser.password;
    return newUser;
  }
}
