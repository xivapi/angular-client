import { TestBed } from '@angular/core/testing';
import { SearchIndex, XivapiService } from '../src';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';


describe('Client tests', () => {

    let service: XivapiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
        });

        const apiKey: string = 'test-key';
        const httpClient: HttpClient = TestBed.get(HttpClient);
        httpMock = TestBed.get(HttpTestingController);
        service = new XivapiService(apiKey, httpClient);
    });

    it('Should be able to call service methods', () => {
        expect(service).not.toBeUndefined();
    });

    it('Should append queryParams to http call for search', () => {
        service.search({indexes: [SearchIndex.ITEM]}).subscribe();
        const req: TestRequest = <TestRequest>httpMock.match({method: 'GET'})
            .find(row => row.request.url === `${XivapiService.API_BASE_URL}/Search`);
        expect(req).not.toBeUndefined();
        expect(req.request.params.has('key')).toBeTruthy();
        expect(req.request.params.has('indexes')).toBeTruthy();
    });
});
