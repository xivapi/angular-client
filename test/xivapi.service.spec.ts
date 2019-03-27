import { TestBed } from '@angular/core/testing';
import { SearchIndex, XivapiEndpoint, XivapiService } from '../src/xivapi-client';
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
});
