import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    CharacterSearchResult,
    Pagination,
    PvpTeam,
    XivapiCharacterOptions,
    XivapiEndpoint,
    XivapiList,
    XivapiOptions,
    XivapiRequestOptions,
    XivapiSearchOptions
} from './model';
import { CharacterResponse, CharacterVerification } from './model/schema/character';
import { GCF_URL } from './xivapi-client.module';
import { LoreSearchResult } from './model/lore-search-result';

@Injectable()
export class XivapiService {

    /**
     * Base url of xivapi.
     */
    public static readonly API_BASE_URL: string = 'https://xivapi.com';
    public static readonly STAGING_API_BASE_URL: string = 'https://staging.xivapi.com';

    constructor(private http: HttpClient, @Inject(GCF_URL) private GCFUrl?: string) {
    }

    /**
     * Makes a request on a given endpoint with an id.
     *
     * @param endpoint The endpoint to use for the request.
     * @param id The id of the resource for the request.
     * @param options The options of the request, optional.
     */
    public get<T = any>(endpoint: XivapiEndpoint, id: number, options?: XivapiRequestOptions): Observable<T> {
        return this.request<T>(`/${endpoint}/${id}`, options);
    }

    /**
     * Makes a request on a given endpoint with an id.
     *
     * @param query Text to search inside the lore.
     * @param lang
     * @param allLanguages should it include Text_*?
     * @param dataColumns Additional data you want to fetch.
     * @param page data page to get
     */
    public searchLore(query: string, lang: string = 'en', allLanguages: boolean = false,
                      dataColumns: string[] = [], page: number = 1): Observable<LoreSearchResult> {
        let httpParams: HttpParams = new HttpParams()
            .set('string', query)
            .set('language', lang)
            .set('page', page.toString());
        if (dataColumns && dataColumns.length > 0) {
            const columns: string[] = [
                'Context',
                'Source',
                'SourceID',
                'Text',
                ...dataColumns.map(col => `Data.${col}`)
            ];
            if (allLanguages) {
                columns.push('Text_*');
            }
            httpParams = httpParams.set('columns', columns.join(','));
        }
        return this.doGet<LoreSearchResult>(`${XivapiService.API_BASE_URL}/lore`, httpParams);
    }

    /**
     * Makes a request to a given endpoint to list resources available.
     *
     * @param endpoint The endpoint to use for the request.
     * @param options The options of the request, optional.
     */
    public getList<T = any>(endpoint: XivapiEndpoint, options?: XivapiRequestOptions): Observable<XivapiList<T>> {
        return this.request<XivapiList<T>>(`/${endpoint}`, options);
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
                const value: string = filter.value instanceof Array ? filter.value.join(';') : filter.value.toString();
                return `${chain}${filter.column}${filter.operator}${value},`;
            }, '').slice(0, -1);
            queryParams = queryParams.set('filters', filterChain);
        }
        const baseUrl: string = options.staging ? XivapiService.STAGING_API_BASE_URL : XivapiService.API_BASE_URL;
        if (options.staging) {
            queryParams = queryParams.delete('staging');
        }
        return this.doGet<any>(`${baseUrl}/Search`, queryParams);
    }

    /**
     * Gets a character using the /Character endpoint.
     *
     * @param lodestoneId LodestoneID of the character to get.
     * @param options Options of the request.
     * @param details Specific details you want to get.
     */
    public getCharacter(lodestoneId: number | string, options?: XivapiCharacterOptions,
                        details?: 'Friends' | 'Achievements' | 'Gearsets' | 'Record' | 'FreeCompany'): Observable<CharacterResponse> {
        return this.request<CharacterResponse>(`/character/${lodestoneId}${details ? '/' + details : ''}`, options);
    }

    /**
     * Gets character verification state using /character/<id>/verification endpoint
     *
     * @param lodestoneId LodestoneID of the character to verify.
     * @param options Options of the request.
     */
    public getCharacterVerification(lodestoneId: number | string, options?: XivapiCharacterOptions): Observable<CharacterVerification> {
        return this.request<CharacterVerification>(`/character/${lodestoneId}/verification`, options);
    }

    /**
     * Gets the current list of available servers. Useful for character search queries.
     */
    public getServerList(): Observable<string[]> {
        return this.request<string[]>(`/servers`);
    }

    /**
     * Gets the current list of available servers, per DC.
     */
    public getDCList(): Observable<{ [index: string]: string[] }> {
        return this.request<{ [index: string]: string[] }>(`/servers/dc`);
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
        let url: string = `/character/search?name=${name}`;
        if (server !== undefined) {
            url += `&server=${server}`;
        }
        if (page !== undefined) {
            url += `&page=${page}`;
        }
        return this.request<CharacterSearchResult>(url);
    }

    /**
     * Search for free companies on The Lodestone. This parses the lodestone in real time so it will be slow for non-cached responses.
     * All search queries are cached for 1 hour, it is important to know that Lodestone has a ~6 hour varnish and CDN cache.
     * This does not search XIVAPI so free companies found may not be on
     * the service and will be added when requested by their specified lodestone ID.
     *
     * @param name The name of the company to search, you can use + for spaces or let the API handle it for you.
     *  If you search very short names you will get lots of responses.
     *  This is an issue with The Lodestone and not much XIVAPI can do about it at this time.
     * @param server (optional) The server to search against, this is case sensitive.
     *  You can obtain a list of valid servers via getServerList method.
     * @param page Search or move to a specific page.
     */
    public searchFreeCompany(name: string, server?: string, page?: number): Observable<{ Results: any[], Pagination: Pagination }> {
        let url: string = `/freecompany/search?name=${name}`;
        if (server !== undefined) {
            url += `&server=${server}`;
        }
        if (page !== undefined) {
            url += `&page=${page}`;
        }
        return this.request<{ Results: any[], Pagination: Pagination }>(url);
    }

    /**
     * Gets character verification informations based on lodestoneId.
     *
     * @param lodestoneId LodestoneID of the character to get.
     * @param options Options of the request.
     */
    public verifyCharacter(lodestoneId: number, options?: XivapiCharacterOptions): Observable<CharacterVerification> {
        return this.request<any>(`/Character/${lodestoneId}/Verification`, options);
    }


    /**
     * Gets a free company using the /FreeCompany endpoint.
     *
     * @param lodestoneId LodestoneID of the free company to get.
     * @param options Options of the request.
     * @param details Specific details you want to get.
     */
    public getFreeCompany(lodestoneId: number | string, options?: XivapiOptions,
                          details?: 'members' | 'record'): Observable<any> {
        return this.request<any>(`/FreeCompany/${lodestoneId}${details ? '/' + details : ''}`, options);
    }

    /**
     * Gets a linkshell using the /Linkshell endpoint.
     *
     * @param lodestoneId LodestoneID of the linkshell to get.
     * @param options Options of the request.
     * @param details Specific details you want to get.
     */
    public getLinkshell(lodestoneId: number | string, options?: XivapiOptions,
                        details?: 'record'): Observable<any> {
        return this.request<any>(`/Linkshell/${lodestoneId}${details ? '/' + details : ''}`, options);
    }

    /**
     * Gets a PvP team based on its lodestone id (string)
     *
     * @param id the id of the team to get.
     * @param options Options of the request
     */
    public getPvPTeam(id: string, options?: XivapiOptions): Observable<PvpTeam> {
        return this.request<PvpTeam>(`/PvPTeam/${id}`, options);
    }

    /**
     * Gets the list of patches using the /PatchList endpoint.
     * @param options Options of the request.
     */
    public getPatchList(options?: XivapiOptions): Observable<any> {
        return this.request<any>(`/PatchList`, options);
    }

     protected request<T>(endpoint: string, params?: XivapiOptions): Observable<T> {
        let queryParams: HttpParams = this.prepareQueryString(params);
        let baseUrl: string = XivapiService.API_BASE_URL;
        if (params) {
            if (params.baseUrl) {
                baseUrl = params.baseUrl;
            } else if (params.staging) {
                baseUrl = XivapiService.STAGING_API_BASE_URL;
            }

            ['staging', 'baseUrl'].forEach(key => {
                if (params.hasOwnProperty(key)) {
                    queryParams.delete(key);
                }
            });
        }
        return this.doGet<any>(`${baseUrl}${endpoint}`, queryParams);
    }

    private prepareQueryString(options?: XivapiOptions): HttpParams {
        let queryString: HttpParams = new HttpParams();
        if (options === null || options === undefined) {
            return queryString;
        }
        Object.keys(options)
            .filter(key => key !== 'extraQueryParams')
            .forEach(optionKey => {
                // @ts-ignore
                const value: any = options[optionKey] as any;
                if (value instanceof Array) {
                    queryString = queryString.set(optionKey, value.join(','));
                } else {
                    queryString = queryString.set(optionKey, value.toString());
                }
            });
        if (options.extraQueryParams !== undefined) {
            Object.keys(options.extraQueryParams)
                .forEach(key => {
                    // @ts-ignore
                    queryString = queryString.set(key, options.extraQueryParams[key].toString());
                });
        }
        return queryString;
    }

    private doGet<T>(url: string, queryParams: HttpParams): Observable<T> {
        if (this.GCFUrl) {
            const queryString: string = queryParams.toString();
            return this.http.get<T>(this.GCFUrl, {params: {url: btoa(`${url}${queryString.length > 0 ? `?${queryString}` : ''}`)}});
        }
        return this.http.get<T>(url, {params: queryParams});
    }
}
