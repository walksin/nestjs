import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
    ) { }

    async login(data: LoginDto) {
        const { name, password } = data;
        const entity = await this.userService.findByName(name);
        if (!entity) {
            throw new UnauthorizedException('user not exist');
        }
        if (!(await entity.comparePassword(password))) {
            throw new UnauthorizedException('password wrong');
        }
        return entity;
    }
}
