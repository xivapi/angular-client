import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    CharacterSearchResult,
    PvpTeam,
    XivapiCharacterOptions,
    XivapiEndpoint,
    XivapiList,
    XivapiOptions,
    XivapiRequestOptions,
    XivapiSearchOptions
} from './model';
import { XIVAPI_KEY } from './xivapi-client.module';
import { CharacterResponse, CharacterVerification } from './model/schema/character';

@Injectable()
export class XivapiService {

    /**
     * Base url of xivapi.
     */
    public static readonly API_BASE_URL: string = 'https://xivapi.com';

    constructor(@Inject(XIVAPI_KEY) protected readonly apiKey: string, private http: HttpClient) {
    }

    /**
     * Makes a request on a given endpoint with an id.
     *
     * @param endpoint The endpoint to use for the request.
     * @param id The id of the resource for the request.
     * @param options The options of the request, optional.
     */
    public get<T = any>(endpoint: XivapiEndpoint, id: number, options?: XivapiRequestOptions): Observable<T> {
        return this.request<T>(`${XivapiService.API_BASE_URL}/${endpoint}/${id}`, options);
    }

    /**
     * Makes a request to a given endpoint to list resources available.
     *
     * @param endpoint The endpoint to use for the request.
     * @param options The options of the request, optional.
     */
    public getList<T = any>(endpoint: XivapiEndpoint, options?: XivapiRequestOptions): Observable<XivapiList<T>> {
        return this.request<XivapiList<T>>(`${XivapiService.API_BASE_URL}/${endpoint}`, options);
    }

    /**
     * Searches for something in the api using the /Search endpoint.
     *
     * @param options Search options, see http://xivapi.com/docs/Search for more details.
     */
    public search(options: XivapiSearchOptions): Observable<any> {
        let queryParams: HttpParams = this.prepareQueryString(options);
        if (options.filters) {
            const filterChain: string = options.filters.reduce((chain, filter) => {
                return `${chain}${filter.column}${filter.operator}${filter.value},`;
            }, '').slice(0, -1);
            queryParams = queryParams.set('filters', filterChain);
        }
        if (this.apiKey !== undefined) {
            queryParams = queryParams.set('key', this.apiKey);
        }
        return this.http.get<any>(`${XivapiService.API_BASE_URL}/Search`, {params: queryParams});
    }

    /**
     * Gets a character using the /Character endpoint.
     *
     * @param lodestoneId LodestoneID of the character to get.
     * @param options Options of the request.
     * @param details Specific details you want to get.
     */
    public getCharacter(lodestoneId: number, options?: XivapiCharacterOptions,
                        details?: 'Friends' | 'Achievements' | 'Gearsets' | 'Record' | 'FreeCompany'): Observable<CharacterResponse> {
        return this.request<any>(`${XivapiService.API_BASE_URL}/Character/${lodestoneId}${details ? '/' + details : ''}`, options);
    }

    /**
     * Gets the current list of available servers. Useful for character search queries.
     */
    public getServerList(): Observable<string[]> {
        return this.request<string[]>(`${XivapiService.API_BASE_URL}/servers`);
    }

    /**
     * Search for a character on **The Lodestone**. This does not search XIVAPI but instead it goes directly to
     * lodestone so the response will be "real-time". Responses are cached for 1 hour,
     * it is important to know that Lodestone has a ~6 hour varnish and CDN cache.
     *
     * @param name The name of the character to search, you can use + for spaces or let the API handle it for you.
     *  If you search very short names you will get lots of responses.
     *  This is an issue with The Lodestone and not much XIVAPI can do about it at this time.
     * @param server (optional) The server to search against, this is case sensitive.
     *  You can obtain a list of valid servers via getServerList method.
     * @param page Search or move to a specific page.
     */
    public searchCharacter(name: string, server?: string, page?: number): Observable<CharacterSearchResult> {
        let url: string = `${XivapiService.API_BASE_URL}/character/search?name=${name}`;
        if (server !== undefined) {
            url += `&server=${server}`;
        }
        if (page !== undefined) {
            url += `&page=${page}`;
        }
        return this.request<CharacterSearchResult>(url);
    }

    /**
     * Gets character verification informations based on lodestoneId.
     *
     * @param lodestoneId LodestoneID of the character to get.
     * @param options Options of the request.
     */
    public verifyCharacter(lodestoneId: number, options?: XivapiCharacterOptions): Observable<CharacterVerification> {
        return this.request<any>(`${XivapiService.API_BASE_URL}/Character/${lodestoneId}/Verification`, options);
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
    public getLinkshell(lodestoneId: number, options?: XivapiOptions,
                        details?: 'record'): Observable<any> {
        return this.request<any>(`${XivapiService.API_BASE_URL}/Linkshell/${lodestoneId}${details ? '/' + details : ''}`, options);
    }

    /**
     * Gets a PvP team based on its lodestone id (string)
     *
     * @param id the id of the team to get.
     */
    public getPvPTeam(id: string): Observable<PvpTeam> {
        return this.request<PvpTeam>(`${XivapiService.API_BASE_URL}/PvPTeam/${id}`);
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
        let queryString: HttpParams = new HttpParams();
        if (this.apiKey !== undefined) {
            queryString = queryString.set('key', this.apiKey);
        }
        if (options === null || options === undefined) {
            return queryString;
        }
        Object.keys(options).forEach(optionKey => {
            // @ts-ignore
            const value: any = options[optionKey] as any;
            if (value instanceof Array) {
                queryString = queryString.set(optionKey, value.join(','));
            } else {
                queryString = queryString.set(optionKey, value.toString());
            }
        });
        return queryString;
    }
}
