import { Injectable } from '@nestjs/common';

import { CreateUserDto, UserDto } from './dto';
import { UserMapper } from './mappers';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly mapper: UserMapper,
    ) { }

    async create(user: CreateUserDto): Promise<UserDto> {
        const entity = await this.userRepository.create(user);

        return this.mapper.toDto(entity);
    }
}
