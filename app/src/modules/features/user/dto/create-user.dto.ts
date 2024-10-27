import { Expose } from 'class-transformer';

export class CreateUserDto {
    @Expose()
    firstName!: string;

    @Expose()
    lastName?: string;

    @Expose()
    chatId!: number;
}
