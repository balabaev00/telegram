import { GlobalUserModule } from '@core/global-user/global-user.module';
import { UserModule } from '@features/user/user.module';
import { Module } from '@nestjs/common';

import { BotService } from './bot.service';

@Module({
    imports: [
        UserModule,
        GlobalUserModule,
    ],
    providers: [BotService],
})
export class BotModule { }
