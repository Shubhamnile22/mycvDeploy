import { ExternalExceptionsHandler } from '@nestjs/core/exceptions/external-exceptions-handler';
import { Expose, Exclude } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  admin: boolean;

  // @Expose()
  // password: string;
}
