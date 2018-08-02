import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { XivapiEndpoint } from './model/xivapi-endpoint';
import { XivapiList } from './model/xivapi-list';
import { XivapiOptions } from './model/xivapi-options';
import { XIVAPI_KEY } from './xivapi-client.module';
import { XivapiCharacterOptions } from './model/xivapi-character-options';
import { XivapiRequestOptions } from './model/xivapi-request-options';
import { XivapiSearchOptions } from './model/xivapi-search-options';
import { XivapiFreeCompanyOptions } from './model/xivapi-free-company-options';

@Injectable()
export class XivapiService {

    protected static readonly API_BASE_URL: string = 'https://xivapi.com';

    constructor(@Inject(XIVAPI_KEY) protected readonly apiKey: string, private http: HttpClient) {
    }

    public get(endpoint: XivapiEndpoint, id: number, options: XivapiRequestOptions): Observable<any> {
        return this.request<any>(`${XivapiService.API_BASE_URL}/${endpoint}/${id}`, options);
    }

    public getList(endpoint: XivapiEndpoint, options: XivapiRequestOptions): Observable<XivapiList<any>> {
        return this.request<XivapiList<any>>(`${XivapiService.API_BASE_URL}/${endpoint}`, options);
    }

    public search(searchString: string, options: XivapiSearchOptions): Observable<any> {
        return this.request<any>(`${XivapiService.API_BASE_URL}/Search`, options);
    }

    public getCharacter(lodestoneId: number, options: XivapiCharacterOptions,
                        details?: 'friends' | 'achievements' | 'gearsets' | 'record'): Observable<any> {
        return this.request<any>(`${XivapiService.API_BASE_URL}/Character/${lodestoneId}${details ? '/' + details : ''}`, options);
    }

    public getFreeCompany(lodestoneId: number, options: XivapiFreeCompanyOptions,
                          details?: 'members' | 'record'): Observable<any> {
        return this.request<any>(`${XivapiService.API_BASE_URL}/FreeCompany/${lodestoneId}${details ? '/' + details : ''}`, options);
    }

    public getLinkshell(lodestoneId: number, options: XivapiFreeCompanyOptions,
                        details?: 'record'): Observable<any> {
        return this.request<any>(`${XivapiService.API_BASE_URL}/FreeCompany/${lodestoneId}${details ? '/' + details : ''}`, options);
    }

    public getPatchList(options: XivapiOptions): Observable<any> {
        return this.request<any>(`${XivapiService.API_BASE_URL}/PatchList`, options);
    }

    protected request<T>(endpoint: string, params: XivapiOptions): Observable<T> {
        const queryParams: HttpParams = this.prepareQueryString(params);
        return this.http.get<any>(endpoint, {params: queryParams});

    }

    private prepareQueryString(options: XivapiOptions): HttpParams {
        const queryString: HttpParams = new HttpParams();
        Object.keys(options).forEach(optionKey => {
            // @ts-ignore
            const value: any = options[optionKey] as any;
            if (value instanceof Array) {
                queryString.append(optionKey, value.join(','));
            } else {
                queryString.append(optionKey, value.toString());
            }
        });
        if (this.apiKey !== undefined) {
            queryString.append('key', this.apiKey);
        }
        return queryString;
    }
}
