import { Component } from '@angular/core';
import { Personnel } from '../models/personnel.model';
import { PersonnelService } from '../services/personnel.service';
import { EquipeService } from '../services/equipe.service';
import { DepartementService } from '../services/departement.service';
import { ProductionService } from '../services/production.service';
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
    idEquipe: null,
    idDepartement: null,
    idSuperviseur: null,
    idTeamLeader: null,
    date_production: ''
  };


  dateProd: string = '';
  equipes: Array<Equipe> | undefined = [];
  departements: Array<Departement> | undefined = [];
  listePersonnel: Array<Personnel> = [];
  listeSuperviseurs: Array<Personnel> = [];
  listeTeamLeaders: Array<Personnel> = [];


  constructor(private route: ActivatedRoute, private router: Router,
    private personnelService: PersonnelService, private prodService: ProductionService,
    private depService: DepartementService, private equipeService: EquipeService,
    private popUpService: PopUpService) {
    this.loadListeDepartements();
    const today = new Date();
    this.dateProd = today.toISOString().slice(0, 10);
  }

  loadListePersonnel(idEquipe: number) {
    this.personnelService.getListePersonnelByEquipe(idEquipe).subscribe({
      next: response => {
        if (response.data.personnel) {
          console.log(response.data.personnel)
          this.listePersonnel = response.data.personnel
          this.filterPersonnelByRole('superviseur');
          this.filterPersonnelByRole('team leader');
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  filterPersonnelByRole(role: string) {
    if (this.listePersonnel.length)
      if (role == 'superviseur') {
        this.listeSuperviseurs = [];
        this.listePersonnel.filter(personnel => {
          personnel.role == 'superviseur' ? this.listeSuperviseurs.push(personnel) : 0
        })
      }
      else {
        this.listeTeamLeaders = [];
        this.listePersonnel.filter(personnel => {
          personnel.role == 'team leader' ? this.listeTeamLeaders.push(personnel) : 0
        })
      }
  }

  loadListeEquipes(idDep: number) {
    this.equipeService.getListeEquipesByDep(idDep).subscribe({
      next: response => {
        if (response.data.equipes)
          this.equipes = response.data.equipes;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  loadListeDepartements() {
    this.depService.getListeDepartements().subscribe(
      response => this.departements = response.data.departements
    );
  }


  submitForm(form: NgForm): void {
    if (!form.valid)
      this.popUpService.showFail("Tous les details sont requises")
    else {
      this.formData.date_production = this.dateProd;
      this.router.navigate(['details-production'], {
        state: {
          enteteProdData: this.formData,
          action: 'add',
        }
      })
    }
  }
}
