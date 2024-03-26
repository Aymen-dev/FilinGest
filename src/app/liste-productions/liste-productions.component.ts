import { Component } from '@angular/core';
import { ProductionService } from '../services/production.service';
import { PopUpService } from '../services/pop-up.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Equipe } from '../models/equipe.model';
import { Departement } from '../models/departement.model';
import { SortingService } from '../services/sorting.service';


@Component({
  selector: 'app-liste-productions',
  templateUrl: './liste-productions.component.html',
  styleUrl: './liste-productions.component.css'
})

export class ListeProductionsComponent {
  listeProd: { id_entete: number, equipeName: string, depName: string, date: Date }[] = [];
  formattedDates: Array<string> = [];
  equipes: Array<Equipe> = [];
  departements: Array<Departement> = [];

  constructor(private route: ActivatedRoute, private router: Router,
    private prodService: ProductionService, private popUpService: PopUpService,
    private sortingService: SortingService) {
    this.loadListeProd();
  }

  sortList(colIndex: number): void {
    let column: 'equipeName' | 'depName' | 'date';
    switch (colIndex) {
      case 1:
        column = 'equipeName';
        break;
      case 2:
        column = 'depName';
        break;
      case 3:
        column = 'date';
        break;
    }
    if (this.sortingService.isSorted(this.listeProd, column!, 'ASC'))
      this.listeProd = this.sortingService.sortList(this.listeProd, column!, 'DESC');

    else if (this.sortingService.isSorted(this.listeProd, column!, 'DESC'))
      this.listeProd = this.sortingService.sortList(this.listeProd, column!, 'ASC');

    else
      this.listeProd = this.sortingService.sortList(this.listeProd, column!, 'ASC');

  }

  isSorted(list: { id_entete: number, equipeName: string, depName: string, date: Date }[],
    column: 'id_entete' | 'equipeName' | 'depName' | 'date',
    sortOrder: 'ASC' | 'DESC'): boolean {
    return this.sortingService.isSorted(list, column, sortOrder);
  }

  loadListeProd(): void {
    this.listeProd = [];
    this.prodService.getListeEntetesProduction().subscribe({
      next: response => {
        if (response.data.entetesProduction) {
          let equipe: Equipe,
            departement: Departement,
            prod: { id_entete: number, equipeName: string, depName: string, date: Date };
          this.equipes = response.data.equipes!;
          this.departements = response.data.departements!;
          for (let entete of response.data.entetesProduction) {
            equipe = this.equipes.find(equipe => equipe.id_equipe == entete.equipe)!;
            departement = this.departements.find(dep => dep.id_departement == entete.departement)!;
            prod = {
              id_entete: entete.id_entete,
              equipeName: equipe!.nom_equipe,
              depName: departement!.nom_departement,
              date: entete.date_production
            }
            this.listeProd.push(prod)
          }
        }
        else {
          this.popUpService.showInfo('Liste vide');
        }
      },
      error: err => {
        if (err.name == 'HttpErrorResponse')
          this.popUpService.showFail('Impossible d\'établir une connexion avec le serveur');
        else
          this.popUpService.showFail('Une erreur s\'est produite, réessayez plus tard ' + err.error.message);
      }
    })
  }

  deleteProduction(id: number): void {
    if (confirm('Supprimer cette production ?'))
      this.prodService.deleteEnteteProductionById(id).subscribe({
        next: () => {
          this.loadListeProd();
          this.popUpService.showSuccess('Production supprimée');
        },
        error: err => {
          this.popUpService.showFail('Une erreur s\'est produite, réessayez plus tard ' + err.error.message);
        }
      })
  }

  editProduction(id: number): void {
    this.prodService.getDetailsProductionByEnteteId(id).subscribe({
      next: response => {
        this.router.navigate(['details-production'], {
          state: {
            response: response,
            action: 'edit'
          }
        })
      },
      error: err => {
        this.popUpService.showFail('Une erreur s\'est produite, réessayez plus tard ' + err.error.message);
      }
    })
  }

  viewProduction(id: number): void {
    this.prodService.getDetailsProductionByEnteteId(id).subscribe({
      next: response => {
        this.router.navigate(['view-details-production'], {
          state: {
            response: response
          }
        });
      },
      error: err => {
        this.popUpService.showFail('Une erreur s\'est produite, réessayez plus tard ' + err.error.message);
      }
    })
  }
}
