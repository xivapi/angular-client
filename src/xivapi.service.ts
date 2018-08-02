import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class XivapiService {

    constructor(private http: HttpClient) {
    }
}
