import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XivapiService } from './xivapi.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { XivapiServiceFactory } from './xivapi-service-factory';

export const XIVAPI_KEY: InjectionToken<string> = new InjectionToken('XIVAPI_KEY');

@NgModule({
    imports: [
        CommonModule,

        HttpClientModule,
    ]
})
export class XivapiClientModule {

    static forRoot(key: string): ModuleWithProviders {
        return {
            ngModule: XivapiClientModule,
            providers: [
                {
                    provide: XIVAPI_KEY,
                    useValue: key
                },
                {
                    provide: XivapiService,
                    useFactory: XivapiServiceFactory,
                    deps: [XIVAPI_KEY, HttpClient]
                }
            ]
        };
    }
}
