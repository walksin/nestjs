import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto, UpdatePasswordDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async store(data: UserDto) {
        const { name } = data;
        const user = await this.userRepository.findOne({ name });
        if (user) {
            throw new BadRequestException('user is already existed.')
        }

        const entity = await this.userRepository.create(data);
        await this.userRepository.save(entity);
        return entity;
    }

    async show(id: string) {
        const entity = await this.userRepository.findOne(id);
        if (!entity) {
            throw new NotFoundException('user not found');
        }
        return entity;
    }

    async updatePassword(id: string, data: UpdatePasswordDto) {
        const { password, newPassword } = data;
        const entity = await this.userRepository.findOne(id);
        if (!entity) {
            throw new NotFoundException('user not found');
        }
        const pass = await entity.comparePassword(password);
        if (!pass) {
            throw new BadRequestException('password verify failed')
        }
        entity.password = newPassword;
        return await this.userRepository.save(entity)
    }

    async findByName(name: string) {
        return await this.userRepository.findOne({ name });
    }
}
