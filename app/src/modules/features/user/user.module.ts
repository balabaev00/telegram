import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModelDefinition } from './entity';
import { UserMapper } from './mappers';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([UserModelDefinition]),
    ],
    providers: [
        UserService,
        UserRepository,
        UserMapper,
    ],
    exports: [UserService],
})
export class UserModule { }
