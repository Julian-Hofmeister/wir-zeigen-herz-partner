import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; // add this


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.initializeApp();

  }

  initializeApp() {
    this.translate.setDefaultLang('de'); // add this
    this.translate.use('de'); //--> I didn't had this line before
  }

}
