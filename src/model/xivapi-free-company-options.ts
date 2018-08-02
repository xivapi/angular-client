import { XivapiOptions } from './xivapi-options';

export interface XivapiFreeCompanyOptions extends XivapiOptions {
    details: 'data' | 'record' | 'members';
}
