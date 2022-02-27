import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthResponseDTO {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Expose()
  token: string;
}
