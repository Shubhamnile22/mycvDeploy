import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async signup(email: string, password: string) {
    //see if email is in true
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    //HAsh the users pass
    //Generate a salt

    const salt = randomBytes(8).toString('hex');

    //Hash the salt and the
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //Join the hashed result and salt togerther
    const result = salt + '.' + hash.toString('hex');

    //create a new user and save it

    const user = await this.usersService.create(email, result);
    // console.log(user, 'in auth service');

    //return the user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
