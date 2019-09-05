import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
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
        const { id } = entity;
        const payload = { id, name }
        const token = this.signToken(payload);

        return {
            ...payload,
            token
        }
    }

    signToken(data: JwtPayload) {
        return this.jwtService.sign(data);
    }
}
