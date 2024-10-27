import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GlobalUserService } from './global-user.service';

@Module({
    imports: [
        HttpModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                baseURL: configService.get('USER_HOST'),
                timeout: 10_000,
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [GlobalUserService],
    exports: [GlobalUserService],
})
export class GlobalUserModule { }
