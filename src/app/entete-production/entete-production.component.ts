import { Component, Inject } from '@angular/core';
import { Personnel } from '../models/personnel.model';
import { PersonnelService } from '../services/personnel.service';
import { EquipeService } from '../services/equipe.service';
import { DepartementService } from '../services/departement.service';
import { ProductionService } from '../services/production.service';
import { BackendResponse } from '../interfaces/backend-response';
import { Equipe } from '../models/equipe.model';
import { Departement } from '../models/departement.model';
import { NgForm } from '@angular/forms';
import { PopUpService } from '../services/pop-up.service';
import { ActivatedRoute, Router } from '@angular/router';





@Component({
  selector: 'app-entete-production',
  templateUrl: './entete-production.component.html',
  styleUrl: './entete-production.component.css'
})
export class EnteteProductionComponent {

  formData = {
    equipe: '',
    departement: '',
    date_production: ''
  };


  dateProd: string = '';
  createEnteteResponse: BackendResponse;
  showDetailsProdComponent: boolean = false;
  equipes: Array<Equipe> | undefined = [];
  departements: Array<Departement> | undefined = [];
  inputSuperviseur: string = '';
  inputTeamLeader: string = '';
  listeSuperviseurs: Array<Personnel> = [];
  listeTeamLeaders: Array<Personnel> = [];


  constructor(private route: ActivatedRoute, private router: Router, private personnelService: PersonnelService, private prodService: ProductionService, private depService: DepartementService, private equipeService: EquipeService, private popUpService: PopUpService) {
    this.createEnteteResponse = { message: '', data: {} };
    this.loadListeEquipes();
    this.loadListeDepartements();
    const today = new Date();
    this.dateProd = today.toISOString().slice(0, 10);
  }
  

  loadListeEquipes() {
    this.equipeService.getListeEquipes().subscribe(
      response => this.equipes = response.data.equipes
    );
  }

  loadListeDepartements() {
    this.depService.getListeDepartements().subscribe(
      response => this.departements = response.data.departements
    );
  }

  searchSuperviseurs(id: number) {
    this.personnelService.getListePersonnelBySearchTerm(this.inputSuperviseur).subscribe(
      response => this.listeSuperviseurs = response
    )
  }

  selectPersonnel(index: number) {
    this.inputSuperviseur = this.listeSuperviseurs[index].nom_prenom;
    this.listeSuperviseurs.length = 0;
  }

  submitForm(form: NgForm): void {
    if (!form.valid)
      this.popUpService.showFail("Tous les details sont requises")
    else
      this.createEnteteProduction();
  }

  createEnteteProduction() {
    this.formData.date_production = this.dateProd;
    this.prodService.saveEnteteProduction(this.formData).subscribe({
      next: (response: BackendResponse) => {
        this.createEnteteResponse = response;
        this.router.navigate(['details-production'], {
          state: {
            response: this.createEnteteResponse
          }
        })
      },
      error: (error: any) => {
        console.error("Error:", error);
        this.popUpService.showFail("Erreur serveur");
      }
    });
    this.showDetailsProdComponent = true;
  }

}
