import { Component, Input, OnInit } from '@angular/core';
import { BackendResponse } from '../interfaces/backend-response';
import { Departement } from '../models/departement.model';
import { Machine } from '../models/machine.model';
import { DetailsProduction } from '../models/details-production.model';
import { EnteteProduction } from '../models/entete-production.model';
import { DepartementService } from '../services/departement.service';
import { DateService } from '../services/date.service';
import { Equipe } from '../models/equipe.model';

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
  equipe?: Equipe;
  date: string = '';

  constructor(private depService: DepartementService, private dateService: DateService) {
  }

  ngOnInit(): void {
    this.response = history.state.response;
    this.getResponseData();
  }

  getResponseData() {
    this.depService.getDepartementById(this.response.data.enteteProduction!.departement).subscribe({
      next: response => {
        this.dep = response.data.departement;
      },
      error: err => {
        console.log(err);
      }
    })
    this.machines = this.response.data.machines;
    this.details = this.response.data.detailsProduction;
    this.entete = this.response.data.enteteProduction;
    this.equipe = this.response.data.equipe;
    this.date = this.dateService.formatDate(new Date(this.entete?.date_production!));
  }

}
