import { Component } from '@angular/core';
import { Personnel } from '../models/personnel.model';
import { PersonnelService } from '../services/personnel.service';
import { Router } from '@angular/router';
import { EquipeService } from '../services/equipe.service';
import { DepartementService } from '../services/departement.service';
import { ProductionService } from '../services/production.service';




@Component({
  selector: 'app-entete-production',
  templateUrl: './entete-production.component.html',
  styleUrl: './entete-production.component.css'
})
export class EnteteProductionComponent {

  formData: any = {
    equipe: '',
    dep: '',
    date: ''
  };

  createEnteteResponse: any;

  showDetailsProdComponent: boolean = false;
  equipes: Array<any> = [];
  departements: Array<any> = [];
  inputSuperviseur: string = '';
  inputTeamLeader: string = '';
  listeSuperviseurs: Array<Personnel> = [];
  listeTeamLeaders: Array<Personnel> = [];

  constructor(private personnelService: PersonnelService, private prodService: ProductionService, private depService: DepartementService, private router: Router, private equipeService: EquipeService) {
    this.loadListeEquipes();
    this.loadListeDepartements();
    const formattedDate = new Date().toISOString().slice(0, 10);
    this.formData.date = formattedDate;
  }

  loadListeEquipes() {
    this.equipeService.getListeEquipes().subscribe(
      response => this.equipes = response.equipes
    );
  }

  loadListeDepartements() {
    this.depService.getListeDepartements().subscribe(
      response => this.departements = response.departements
    );
  }

  /**
   * Fonctionnalités recherche personnel (Superviseur + Team leader)
   */
  searchSuperviseurs(id: number) {
    this.personnelService.getListePersonnelBySearchTerm(this.inputSuperviseur).subscribe(
      response => this.listeSuperviseurs = response
    )
  }

  selectPersonnel(index: number) {
    this.inputSuperviseur = this.listeSuperviseurs[index].nom_prenom;
    this.listeSuperviseurs.length = 0;
  }

  createEnteteProduction(formData: any) {
    this.prodService.saveEnteteProduction(formData).subscribe(
      response => {
        this.createEnteteResponse = response
      }
    )
    this.showDetailsProdComponent = true;
  }

}
