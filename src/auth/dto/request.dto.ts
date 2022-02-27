import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthRequestDTO {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Expose()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Expose()
  password: string;
}
