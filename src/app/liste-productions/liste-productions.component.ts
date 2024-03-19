import { Component } from '@angular/core';
import { ProductionService } from '../services/production.service';
import { BackendResponse } from '../interfaces/backend-response';
import { EnteteProduction } from '../models/entete-production.model';
import { PopUpService } from '../services/pop-up.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Equipe } from '../models/equipe.model';
import { Departement } from '../models/departement.model';





@Component({
  selector: 'app-liste-productions',
  templateUrl: './liste-productions.component.html',
  styleUrl: './liste-productions.component.css'
})

export class ListeProductionsComponent {
  listeProd: Array<EnteteProduction> | undefined = [];
  equipes: Array<Equipe> = [];
  departements: Array<Departement> = [];
  showDetailsProduction: boolean = false;
  setDetailsProductionVisible: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private prodService: ProductionService, private popUpService: PopUpService) {
    this.loadListeProd();
  }

  loadListeProd() {
    this.prodService.getListeEntetesProduction().subscribe({
      next: response => {
        if (response.data.entetesProduction) {
          this.listeProd = response.data.entetesProduction;
          this.equipes = response.data.equipes!;
          this.departements = response.data.departements!
        }
        else {
          this.popUpService.showInfo('Liste vide');
          this.listeProd = undefined;
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

  deleteProduction(id: number) {
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

  editProduction(id: number) {
    this.prodService.getDetailsProductionByEnteteId(id).subscribe({
      next: response => {
        this.router.navigate(['details-production'], {
          state: {
            response: response,
            action: 'edit',
            entete: id
          }
        })
      },
      error: err => {
        this.popUpService.showFail('Une erreur s\'est produite, réessayez plus tard ' + err.error.message);
      }
    })
  }

  viewProduction(id: number) {
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

  isSorted(listeProd: Array<EnteteProduction>, entity: string, sortOrder: 'ASC' | 'DESC'): boolean {
    const sortedList = this.sortList(listeProd, entity, sortOrder);
    return this.arraysAreEqual(listeProd, sortedList);
  }

  sortList(listeProd: Array<EnteteProduction>, entity: string, sortOrder: 'ASC' | 'DESC'): Array<EnteteProduction> {
    return listeProd.slice().sort((a, b) => {
      const aValue = this.getPropertyValue(a, entity);
      const bValue = this.getPropertyValue(b, entity);

      if (sortOrder === 'ASC') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }

  getPropertyValue(item: EnteteProduction, property: string): string {
    switch (property) {
      case 'equipe':
        return this.equipes.find(equipe => equipe.id_equipe === item.equipe)?.nom_equipe || '';
      case 'departement':
        return this.departements.find(dep => dep.id_departement === item.departement)?.nom_departement || '';
      case 'date':
        return new Date(item.date_production).toISOString();
      default:
        return '';
    }
  }

  arraysAreEqual(arr1: Array<EnteteProduction>, arr2: Array<EnteteProduction>): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  }

  sort(entity: string, sortOrder: 'ASC' | 'DESC'): void {
    if (this.listeProd) {
      this.listeProd = this.sortList(this.listeProd, entity, sortOrder);
    }
  }

  sortColumn(columnIndex: number) {
    if (!this.listeProd) return;

    let entity: string;
    let sortOrder: 'ASC' | 'DESC';

    switch (columnIndex) {
      case 1:
        entity = 'equipe';
        break;
      case 2:
        entity = 'departement';
        break;
      case 3:
        entity = 'date';
        break;
      default:
        return;
    }

    if (this.isSorted(this.listeProd, entity, 'DESC')) {
      sortOrder = 'ASC';
    } else if (this.isSorted(this.listeProd, entity, 'ASC')) {
      sortOrder = 'DESC';
    } else {
      sortOrder = 'ASC';
    }

    this.sort(entity, sortOrder);
  }

  isAscending(columnIndex: number): boolean {
    const entity = this.getEntityForColumn(columnIndex);
    return this.isSorted(this.listeProd!, entity, 'ASC');
  }
  
  isDescending(columnIndex: number): boolean {
    const entity = this.getEntityForColumn(columnIndex);
    return this.isSorted(this.listeProd!, entity, 'DESC');
  }
  
  getEntityForColumn(columnIndex: number): string {
    switch (columnIndex) {
      case 1:
        return 'equipe';
      case 2:
        return 'departement';
      case 3:
        return 'date';
      default:
        return '';
    }
  }
  


  
}
