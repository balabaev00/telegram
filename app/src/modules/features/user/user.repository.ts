import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto';
import { UserDocument, UserEntity } from './entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(UserEntity.name)
        private readonly model: Model<UserDocument>,
    ) { }

    create(user: CreateUserDto): Promise<UserDocument> {
        return this.model.create({
            firstName: user.firstName,
            lastName: user.lastName,
        });
    }
}
