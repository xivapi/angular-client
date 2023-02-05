import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XivapiService } from './xivapi.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { XivapiServiceFactory } from './xivapi-service-factory';

export const GCF_URL: InjectionToken<string> = new InjectionToken('GCF_URL');

@NgModule({
    imports: [
        CommonModule,

        HttpClientModule,
    ]
})
export class XivapiClientModule {

    static forRoot(GCFUrl?: string): ModuleWithProviders<XivapiClientModule> {
        return {
            ngModule: XivapiClientModule,
            providers: [
                {
                    provide: GCF_URL,
                    useValue: GCFUrl
                },
                {
                    provide: XivapiService,
                    useFactory: XivapiServiceFactory,
                    deps: [HttpClient, GCF_URL]
                }
            ]
        };
    }
}
