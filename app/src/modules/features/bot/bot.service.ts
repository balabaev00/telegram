/* eslint-disable camelcase */
import { GlobalUserService } from '@core/global-user/global-user.service';
import { UserService } from '@features/user/user.service';
import { Command, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { BotCommand } from 'telegraf/typings/core/types/typegram';

import { BotMessage } from './constants';
import { IBotContext } from './types';

@Update()
export class BotService {
    constructor(
        @InjectBot() private readonly bot: Telegraf<IBotContext>,
        private readonly userService: UserService,
        private readonly globalUserService: GlobalUserService,
    ) { }

    async initializeCommand(): Promise<void> {
        const BOT_COMMANDS: BotCommand[] = [
            { command: 'start', description: 'Начать работу с ботом' },
        ];

        await this.bot.telegram.setMyCommands(BOT_COMMANDS);
    }

    @Start()
    async onStart(@Ctx() ctx: IBotContext): Promise<void> {
        const { message } = ctx;

        if (message) {
            const currentUser = await this.userService.findOneByChatId(message.chat.id);

            if (currentUser) {
                await ctx.reply(BotMessage.USER_ALREADY_REGISTERED);
                return;
            }

            // Не паралеллю специально (сделаю позже)
            // TODO: Сделать удаление если v1UserPost отработает, а в базу создание нет
            const globalUser = await this.globalUserService.v1UserPost({
                firstName: message.from.first_name,
                lastName: message.from.last_name,
            });

            await this.userService.create({
                firstName: message.from.first_name,
                lastName: message.from.last_name,
                globalId: globalUser.id,
                chatId: message.chat.id,
            });

            await this.showMenu(BotMessage.SUCCESSFULLY_REGISTERED, ctx);
        }
    }

    @Command('menu')
    async menuCommand(@Ctx() ctx: IBotContext): Promise<void> {
        await this.showMenu('Выберите действие:', ctx);
    }

    private async showMenu(message: string, ctx: IBotContext): Promise<void> {
        await ctx.reply(message, {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Добавить доход', callback_data: 'add_income' },
                        { text: 'Добавить расход', callback_data: 'add_expense' },
                    ],
                    [
                        { text: 'Посмотреть баланс', callback_data: 'view_balance' },
                        { text: 'История транзакций', callback_data: 'transaction_history' },
                    ],
                    [{ text: 'Настройки', callback_data: 'settings' }],
                ],
            },
        });
    }
}
