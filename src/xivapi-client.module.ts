import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XivapiService } from './xivapi.service';
import { HttpClientModule } from '@angular/common/http';

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
                XivapiService,
                {provide: XIVAPI_KEY, useValue: key}
            ]
        };
    }
}
