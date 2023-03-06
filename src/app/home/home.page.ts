import {Component, ViewChild} from '@angular/core';
import {IonModal} from "@ionic/angular";
import {Partner} from "./partner.interface";
import {Category} from "./categories";
import {Country} from "./countries";
import {TranslateService} from "@ngx-translate/core";
import {PartnerService} from "./partner.service";

import categories from '../../assets/json/categories.json';
import partnerData from '../../assets/json/partner.json';
import countries from '../../assets/json/countries.json';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
//#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @ViewChild('selectCategory') categoryFilter: HTMLIonSelectElement;

  @ViewChild(IonModal) modal: IonModal;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  searchTerm = '';
  filteredPartner: Partner[] = [];
  filter: Category | undefined = undefined;

  partner: Partner[] = [];
  loadedPartner: Partner[] = [];
  categories: Category[];
  countries: Country[];

  language: string = this.translateService.currentLang;
  country: Country;
  countryName: string;

  isModalOpen = false;


  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(
    private translateService: TranslateService,
    public partnerService: PartnerService) {
  }

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.categories = categories;
    this.countries = countries;

    this.loadedPartner = partnerData as Partner[]


  }


  ionViewWillEnter() {
    if(!this.country) {
      // this.openModal(true);
    }

    this.language = this.translateService.currentLang;
    this.getCountry();


   this.fillPartner();
  }
  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  filterList(evt: any) {
    this.searchTerm = evt.srcElement.value;

    console.log(this.searchTerm)

    if (!this.searchTerm) {return;}

    this.filteredPartner = this.partnerService.filterList(this.searchTerm, this.partner);

    this.onClearCategoryFilter();
  }

  // ----------------------------------------------------------------------------------------------

  filterCategories(evt: any) {
    this.filter = evt.detail.value;

    console.log(this.filter)

    this.filteredPartner = this.partnerService.filterCategories(this.filter!.id, this.partner);

  }

  // ----------------------------------------------------------------------------------------------

  onClearCategoryFilter(){
    this.filter = undefined;
    this.categoryFilter.value = null;
  }

  // ----------------------------------------------------------------------------------------------

  switchLanguage() {
    const lang = this.translateService.currentLang === "en" ? "de" : "en";
    console.log(this.translateService.currentLang)
    this.translateService.use(lang);

    console.log(this.translateService.currentLang)
    this.language = this.translateService.currentLang;
  }

  // ----------------------------------------------------------------------------------------------

  selectCountry(evt: any) {
    this.country = evt.detail.value;

    localStorage.setItem('country', JSON.stringify(this.country));

    this.fillPartner();

    this.openModal(false);
  }

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  getCountry(){
    this.country = JSON.parse(localStorage.getItem("country")!);

    console.log(this.country);


    if(this.country) {return}

    // this.modal.present().then();
  }

  // ----------------------------------------------------------------------------------------------

  openModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  onDidDismiss() {
    this.isModalOpen = false;
  }

  // ----------------------------------------------------------------------------------------------

  fillPartner() {

    this.partner = [];

    for(let partner of this.loadedPartner) {
      if(this.country.value === "germany" && partner.linkDE !== "") {
        this.partner.push(partner);
      }
      else if(this.country.value === "austria" && partner.linkAT !== "") {
        this.partner.push(partner);
      }
      else if(this.country.value === "switzerland" && partner.linkCH !== "") {
        this.partner.push(partner);
      }
      else if(this.country.value === "worldwide" && partner.linkWW !== "") {
        this.partner.push(partner);
      }


    }
  }
  //#endregion
}
