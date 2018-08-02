import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XivapiService } from './xivapi.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    imports: [
        CommonModule,

        HttpClientModule,
    ]
})
export class XivapiClientModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: XivapiClientModule,
            providers: [
                XivapiService
            ]
        };
    }
}
