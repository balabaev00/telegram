import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ autoIndex: true, timestamps: true, collection: 'users' })
export class UserEntity {
    @Prop({ required: true, unique: true })
    chatId!: number;

    @Prop({ required: true })
    firstName!: string;

    @Prop({ required: false })
    lastName?: string;
}

export type UserDocument = HydratedDocument<UserEntity>;
export const UserSchema = SchemaFactory.createForClass(UserEntity);

export const UserModelDefinition = {
    name: UserEntity.name,
    schema: UserSchema,
};
