
import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {IonicModule} from "@ionic/angular";
import {PartnerCardComponent} from "./partner-card.component";


@NgModule({
    declarations: [PartnerCardComponent],
    imports: [
        IonicModule
    ],
    exports: [
      PartnerCardComponent,
        MatIconModule,
    ]
})
export class PartnerCardModule {}
