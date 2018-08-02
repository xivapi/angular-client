import { XivapiOptions } from './xivapi-options';

export interface XivapiCharacterOptions extends XivapiOptions {
    files?: 'data' | 'friends' | 'achievements' | 'record' | 'gea' [];
    extend?: 0 | 1;
    fc?: 0 | 1;
}
