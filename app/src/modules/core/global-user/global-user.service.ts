import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { CreateUserDto, UserDto } from './dto/v1';

@Injectable()
export class GlobalUserService {
    constructor(
        private readonly requester: HttpService
    ) { }

    async v1UserPost(body: CreateUserDto): Promise<UserDto> {
        const { data } = await firstValueFrom(
            this.requester.post<UserDto>('v1/user', body)
        );

        return data;
    }
}
