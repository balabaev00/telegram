import { Expose } from 'class-transformer';

export class CreateUserDto {
    @Expose()
    globalId!: string;

    @Expose()
    firstName!: string;

    @Expose()
    lastName?: string;

    @Expose()
    chatId!: number;
}
