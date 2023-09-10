import { IsNotEmpty } from 'class-validator';

export class SearchUsersDto {
  @IsNotEmpty()
  ledger: string;
}
