import { XivapiService } from './xivapi.service';
import { HttpClient } from '@angular/common/http';

export function XivapiServiceFactory(key: string, http: HttpClient): XivapiService {
    return new XivapiService(key, http);
}
