import { XivapiService } from './xivapi.service';
import { HttpClient } from '@angular/common/http';

export function XivapiServiceFactory(http: HttpClient, GCFUrl: string): XivapiService {
    return new XivapiService(http, GCFUrl);
}
