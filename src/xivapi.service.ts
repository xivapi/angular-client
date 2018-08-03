import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    XivapiCharacterOptions,
    XivapiEndpoint,
    XivapiFreeCompanyOptions,
    XivapiList,
    XivapiOptions,
    XivapiRequestOptions,
    XivapiSearchOptions
} from './model';
import { XIVAPI_KEY } from './xivapi-client.module';

@Injectable()
export class XivapiService {

    /**
     * Base url of xivapi.
     */
    protected static readonly API_BASE_URL: string = 'https://xivapi.com';

    constructor(@Inject(XIVAPI_KEY) protected readonly apiKey: string, private http: HttpClient) {
    }

    /**
     * Makes a request on a given endpoint with an id.
     *
     * @param endpoint The endpoint to use for the request.
     * @param id The id of the resource for the request.
     * @param options The options of the request, optional.
     */
    public get(endpoint: XivapiEndpoint, id: number, options?: XivapiRequestOptions): Observable<any> {
        return this.request<any>(`${XivapiService.API_BASE_URL}/${endpoint}/${id}`, options);
    }

    /**
     * Makes a request to a given endpoint to list resources available.
     *
     * @param endpoint The endpoint to use for the request.
     * @param options The options of the request, optional.
     */
    public getList(endpoint: XivapiEndpoint, options?: XivapiRequestOptions): Observable<XivapiList<any>> {
        return this.request<XivapiList<any>>(`${XivapiService.API_BASE_URL}/${endpoint}`, options);
    }

    /**
     * Searches for something in the api using the /Search endpoint.
     *
     * @param options Search options, see http://xivapi.com/docs/Search for more details.
     */
    public search(options: XivapiSearchOptions): Observable<any> {
        const queryParams: HttpParams = this.prepareQueryString(options);
        if (options.filters) {
            const filterChain: string = options.filters.reduce((chain, filter) => {
                return `${chain}${filter.column}${filter.operator}${filter.value}&`;
            }, '').slice(0, -1);
            queryParams.append('filters', filterChain);
        }
        return this.request<any>(`${XivapiService.API_BASE_URL}/Search`, options);
    }

    /**
     * Gets a character using the /Character endpoint.
     *
     * @param lodestoneId LodestoneID of the character to get.
     * @param options Options of the request.
     * @param details Specific details you want to get.
     */
    public getCharacter(lodestoneId: number, options?: XivapiCharacterOptions,
                        details?: 'friends' | 'achievements' | 'gearsets' | 'record'): Observable<any> {
        return this.request<any>(`${XivapiService.API_BASE_URL}/Character/${lodestoneId}${details ? '/' + details : ''}`, options);
    }


    /**
     * Gets a free company using the /FreeCompany endpoint.
     *
     * @param lodestoneId LodestoneID of the free company to get.
     * @param options Options of the request.
     * @param details Specific details you want to get.
     */
    public getFreeCompany(lodestoneId: number, options?: XivapiOptions,
                          details?: 'members' | 'record'): Observable<any> {
        return this.request<any>(`${XivapiService.API_BASE_URL}/FreeCompany/${lodestoneId}${details ? '/' + details : ''}`, options);
    }

    /**
     * Gets a linkshell using the /Linkshell endpoint.
     *
     * @param lodestoneId LodestoneID of the linkshell to get.
     * @param options Options of the request.
     * @param details Specific details you want to get.
     */
    public getLinkshell(lodestoneId: number, options?: XivapiFreeCompanyOptions,
                        details?: 'record'): Observable<any> {
        return this.request<any>(`${XivapiService.API_BASE_URL}/Linkshell/${lodestoneId}${details ? '/' + details : ''}`, options);
    }

    /**
     * Gets the list of patches using the /PatchList endpoint.
     * @param options Options of the request.
     */
    public getPatchList(options: XivapiOptions): Observable<any> {
        return this.request<any>(`${XivapiService.API_BASE_URL}/PatchList`, options);
    }

    protected request<T>(endpoint: string, params?: XivapiOptions): Observable<T> {
        const queryParams: HttpParams = this.prepareQueryString(params);
        return this.http.get<any>(endpoint, {params: queryParams});

    }

    private prepareQueryString(options?: XivapiOptions): HttpParams {
        const queryString: HttpParams = new HttpParams();
        if (options === null || options === undefined) {
            return queryString;
        }
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
