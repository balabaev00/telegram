import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IMapper } from 'src/common/interfaces';

import { UserDto } from '../dto';
import { UserDocument } from '../entity';

@Injectable()
export class UserMapper implements IMapper<UserDocument, UserDto> {
    toDto(entity: UserDocument): UserDto {
        return plainToInstance(
            UserDto,
            {
                id: entity._id.toString(),
                firstName: entity.firstName,
                lastName: entity.lastName,
            }
        );
    }
}
