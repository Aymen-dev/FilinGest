import { Component } from '@angular/core';
import { ProductionService } from '../services/production.service';
import { BackendResponse } from '../interfaces/backend-response';
import { EnteteProduction } from '../models/entete-production.model';
import { PopUpService } from '../services/pop-up.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'





@Component({
  selector: 'app-liste-productions',
  templateUrl: './liste-productions.component.html',
  styleUrl: './liste-productions.component.css'
})

export class ListeProductionsComponent {
  listeProd: Array<EnteteProduction> | undefined = [];
  responseMessage: string = '';
  showDetailsProduction: boolean = false;
  setDetailsProductionVisible: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private prodService: ProductionService, private popUpService: PopUpService) {
    this.loadListeProd();
  }

  loadListeProd() {
    this.prodService.getListeEntetesProduction().subscribe({
      next: (response) => {
        if (response.data.entetesProduction) {
          this.listeProd = (response as BackendResponse).data.entetesProduction;
          this.responseMessage = (response as BackendResponse).message;
        }
        else{
          this.popUpService.showInfo('Liste vide');
          this.listeProd = undefined;
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  deleteProduction(id: number) {
    if (confirm('Supprimer cette production ?'))
      this.prodService.deleteEnteteProductionById(id).subscribe({
        next: () => {
          this.loadListeProd();
          this.popUpService.showSuccess('Production supprimée');
        },
        error: (error) => {
          console.log('Error:' + error)
        }
      })
  }

  editProduction(id: number) {
    this.prodService.getDetailsProductionByEnteteId(id).subscribe(
      response => {
        this.router.navigate(['details-production'], {
          state: {
            response: response
          }
        })
      }
    )
  }

  viewProduction(id: number) {
    this.prodService.getDetailsProductionByEnteteId(id).subscribe(
      response => {
        this.router.navigate(['view-details-production'], {
          state: {
            response: response
          }
        });
      }
    )
  }
}
