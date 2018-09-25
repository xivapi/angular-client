import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XivapiService } from './xivapi.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { XivapiServiceFactory } from './xivapi-service-factory';

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
                    provide: XivapiService,
                    useFactory: XivapiServiceFactory,
                    deps: [key, HttpClient]
                }
            ]
        };
    }
}
