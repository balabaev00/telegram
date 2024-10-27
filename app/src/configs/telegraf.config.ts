import { BotModule } from '@features/bot/bot.module';
import { ConfigService } from '@nestjs/config';
import { TelegrafModuleOptions } from 'nestjs-telegraf';
import { sessionMiddleware } from 'src/common/middlewares';

export const createTelegrafConfig = (configService: ConfigService): TelegrafModuleOptions => ({
    token: configService.getOrThrow('TELEGRAM_BOT_TOKEN'),
    middlewares: [sessionMiddleware],
    include: [BotModule],
});
