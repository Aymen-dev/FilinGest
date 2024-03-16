import { Component, Input, OnInit } from '@angular/core';
import { BackendResponse } from '../interfaces/backend-response';
import { Departement } from '../models/departement.model';
import { Machine } from '../models/machine.model';
import { DetailsProduction } from '../models/details-production.model';
import { EnteteProduction } from '../models/entete-production.model';

@Component({
  selector: 'app-view-details-production',
  templateUrl: './view-details-production.component.html',
  styleUrl: './view-details-production.component.css'
})
export class ViewDetailsProductionComponent implements OnInit {

  
  response!: BackendResponse;

  dep?: Departement;
  machines?: Array<Machine>;
  details?: Array<DetailsProduction>;
  entete?: EnteteProduction;

  constructor() {
  }

  ngOnInit(): void {
    this.response = history.state.response;
    this.getResponseData();
  }

  getResponseData() {
    this.dep = this.response.data.departement;
    this.machines = this.response.data.machines;
    this.details = this.response.data.detailsProduction;
    this.entete = this.response.data.enteteProduction;
  }

}
