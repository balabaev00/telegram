import { Context, Scenes } from 'telegraf';

export interface ISessionData { }

export interface IBotContext extends Context {
    session: ISessionData;
    scene: Scenes.SceneContextScene<IBotContext>;
}
