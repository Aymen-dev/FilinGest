import { Component } from '@angular/core';
import { ProductionService } from '../services/production.service';
import { DetailsProductionComponent } from '../details-production/details-production.component';
import { ViewDetailsProductionComponent } from '../view-details-production/view-details-production.component';





@Component({
  selector: 'app-liste-productions',
  templateUrl: './liste-productions.component.html',
  styleUrl: './liste-productions.component.css'
})

export class ListeProductionsComponent {
  listeProd: Array<any> = [];
  responseMessage: string = '';
  showDetailsProduction: boolean = false;
  setDetailsProductionVisible: boolean = false;
  responseData: any;

  constructor(private prodService: ProductionService) {
    this.loadListeProd();
  }


  loadListeProd() {
    this.prodService.getListeEntetesProduction().subscribe(
      response => {
        this.listeProd = (response as any).data;
        this.responseMessage = (response as any).message;
        console.log(response);
      }
    )
  }

  deleteProduction(id: number) {
    if (confirm('Supprimer cette production ?'))
      this.prodService.deleteEnteteProductionById(id).subscribe(
        response => this.loadListeProd()
      )
  }

  editProduction(id: number) {
    this.prodService.getDetailsProductionByEnteteId(id).subscribe(
      response => {
        this.responseData = response;
        this.showDetailsProduction = true;
        console.log(this.responseData);
      }
    )
  }

  viewProduction(id: number) {
    this.prodService.getDetailsProductionByEnteteId(id).subscribe(
      response => {
        this.responseData = response; /*respnose = {data, departement, entete, machines,message}*/
        this.setDetailsProductionVisible = true;
        console.log(this.responseData);
      }
    )
  }
}
