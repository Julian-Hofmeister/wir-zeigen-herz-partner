import {Component, Input, OnInit} from '@angular/core';
import {Country} from "../countries";
import {Partner} from "../partner.interface";
import {PartnerService} from "../partner.service";

@Component({
  selector: 'app-partner-card',
  templateUrl: './partner-card.component.html',
  styleUrls: ['./partner-card.component.scss'],
})
export class PartnerCardComponent implements OnInit {

  //#region [ BINDINGS ] //////////////////////////////////////////////////////////////////////////

  @Input() partner: Partner;
  @Input() country: Country;

  logo: string;

  link: string | undefined;

  //#endregion

  //#region [ PROPERTIES ] /////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ MEMBERS ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ CONSTRUCTORS ] //////////////////////////////////////////////////////////////////////

  constructor(private partnerService: PartnerService)
  {
  }

  //#endregion

  //#region [ LIFECYCLE ] /////////////////////////////////////////////////////////////////////////

  ngOnInit() {
    this.logo = "assets/imgs/partner/" + this.partner.logoImg;


  }

  //#endregion

  //#region [ EMITTER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ RECEIVER ] ///////////////////////////////////////////////////////////////////////////

  //#endregion

  //#region [ PUBLIC ] ////////////////////////////////////////////////////////////////////////////

  async openLink() {
    console.log(this.country.value)

    this.link = this.country.value === "germany" ?  this.partner.linkDE : this.country.value === "austria" ?  this.partner.linkAT : this.country.value === "switzerland" ?  this.partner.linkCH : this.partner.linkWW

    window.open(this.link);

    await this.partnerService.addPartner(this.partner)


  }

  // ----------------------------------------------------------------------------------------------

  //#endregion

  //#region [ PRIVATE ] ///////////////////////////////////////////////////////////////////////////

  // ----------------------------------------------------------------------------------------------

  //#endregion

}
