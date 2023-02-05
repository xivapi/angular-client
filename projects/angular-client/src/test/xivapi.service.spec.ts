import { TestBed } from '@angular/core/testing';
import { SearchIndex, XivapiEndpoint, XivapiService } from '../lib/xivapi-client';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';


describe('Client tests', () => {

    let service: XivapiService;
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
        });

        httpClient = TestBed.get(HttpClient);
        httpMock = TestBed.get(HttpTestingController);
        service = new XivapiService(httpClient);
    });

    it('Should be able to call service methods', () => {
        expect(service).not.toBeUndefined();
    });

    it('Should append queryParams to http call for search', () => {
        service.search({indexes: [SearchIndex.ITEM]}).subscribe();
        const req: TestRequest = <TestRequest>httpMock.match({method: 'GET'})
            .find(row => row.request.url === `${XivapiService.API_BASE_URL}/Search`);
        expect(req).not.toBeUndefined();
        expect(req.request.params.has('indexes')).toBeTruthy();
    });

    it('Should handle GCF mapping', () => {
        const GCFService: XivapiService = new XivapiService(httpClient, 'https://example.org');
        GCFService.get(XivapiEndpoint.Item, 12087).subscribe();
        const req: TestRequest = <TestRequest>httpMock.match({method: 'GET'})
            .find(row => row.request.url === `https://example.org`);
        expect(req).not.toBeUndefined();
        expect(req.request.params.has('url')).toBeTruthy();
        expect(req.request.params.get('url')).toEqual('aHR0cHM6Ly94aXZhcGkuY29tL0l0ZW0vMTIwODc=');
    });

    it('Should search Lore properly', () => {
        const service: XivapiService = new XivapiService(httpClient);
        service.searchLore('legendary').subscribe();
        const req: TestRequest = <TestRequest>httpMock.match({method: 'GET'})
            .find(row => row.request.url === `${XivapiService.API_BASE_URL}/lore`);
        expect(req).not.toBeUndefined();
        expect(req.request.params.has('string')).toBeTruthy();
        expect(req.request.params.get('string')).toEqual('legendary');
    });

    it('Should search Lore properly with custom data columns', () => {
        const service: XivapiService = new XivapiService(httpClient);
        service.searchLore('legendary', 'en', false, ['Icon']).subscribe();
        const req: TestRequest = <TestRequest>httpMock.match({method: 'GET'})
            .find(row => row.request.url === `${XivapiService.API_BASE_URL}/lore`);
        expect(req).not.toBeUndefined();
        expect(req.request.params.has('string')).toBeTruthy();
        expect(req.request.params.get('string')).toEqual('legendary');
        expect(req.request.params.get('columns')).toEqual('Context,Source,SourceID,Text,Data.Icon');
    });

    it('Should use custom baseUrl when `baseUrl` is provided', () => {
        const service: XivapiService = new XivapiService(httpClient);
        service.get(XivapiEndpoint.Item, 12087, {
            baseUrl: 'https://example.org'
        }).subscribe();
        const req: TestRequest = <TestRequest>httpMock.match({method: 'GET'})
            .find(row => row.request.url === 'https://example.org/Item/12087');
        expect(req).not.toBeUndefined();
    });

    it('Should use custom baseUrl when both baseUrl and staging are provided', () => {
        const service: XivapiService = new XivapiService(httpClient);
        service.get(XivapiEndpoint.Item, 12087, {
            baseUrl: 'https://example.org',
            staging: true
        }).subscribe();
        const req: TestRequest = <TestRequest>httpMock.match({method: 'GET'})
            .find(row => row.request.url === 'https://example.org/Item/12087');
        expect(req).not.toBeUndefined();
    });

    it('Should search Lore with custom baseUrl', () => {
        const service: XivapiService = new XivapiService(httpClient);
        service.searchLore('legendary', 'en', false, [], 1, {
            baseUrl: 'https://example.org',
        }).subscribe();
        const req: TestRequest = <TestRequest>httpMock.match({method: 'GET'})
            .find(row => row.request.url === 'https://example.org/lore');
        expect(req).not.toBeUndefined();
        expect(req.request.params.has('string')).toBeTruthy();
        expect(req.request.params.get('string')).toEqual('legendary');
    });
});
