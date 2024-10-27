import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDto {
    @ApiProperty({
        example: '6513f5ad8c1c3b76396f68bb',
        description: 'Идентификатор пользователя',
        type: String,
    })
    @Expose()
    id!: string;

    @ApiProperty({
        example: 'Иван',
        description: 'Имя пользователя',
        type: String,
    })
    @Expose()
    firstName!: string;

    @ApiPropertyOptional({
        example: 'Иванов',
        description: 'Фамилия пользователя',
        type: String,
    })
    @Expose()
    lastName?: string;
}
