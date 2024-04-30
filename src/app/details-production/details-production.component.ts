import { Component, Input, OnInit } from '@angular/core';
import { Machine } from '../models/machine.model';
import { MachineService } from '../services/machine.service';
import { ProductionService } from '../services/production.service';
import { TitreFilService } from '../services/titre-fil.service';
import { BackendResponse } from '../interfaces/backend-response';
import { TitreFil } from '../models/titre-fil.model';
import { DetailsProduction } from '../models/details-production.model';
import { PopUpService } from '../services/pop-up.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from '../models/departement.model';
import { DepartementService } from '../services/departement.service';
import { Equipe } from '../models/equipe.model';
import { EquipeService } from '../services/equipe.service';
import { PlanificationService } from '../services/planification.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-details-production',
  templateUrl: './details-production.component.html',
  styleUrl: './details-production.component.css'
})
export class DetailsProductionComponent implements OnInit {

  machines: Array<Machine> = [];
  departement: Departement = new Departement();
  equipe: Equipe = new Equipe();
  dateProduction = '';
  titresFil: Array<TitreFil> = [];
  inputLevata: Array<number> = [];
  inputObjectifProd: Array<number> = [];
  inputTitre: Array<number | null> = [];
  nbLevatas: Array<number> = [];
  response!: BackendResponse;
  isDepFilature: boolean = false;

  enteteProdData = {
    idEquipe: 0,
    idDepartement: 0,
    superviseur: 0,
    team_leader: 0,
    date_production: ''
  };

  formData: { productionDetails: Array<{}> } = {
    productionDetails: []
  };

  ngOnInit(): void {
    this.enteteProdData = history.state.enteteProdData;
    this.response = history.state.response;
    this.getEntities();
    this.setInputLevata();
    this.setInputTitres();
  }


  constructor(private route: ActivatedRoute, private router: Router,
    private machineService: MachineService, private prodService: ProductionService,
    private titreService: TitreFilService, private popUpService: PopUpService,
    private depService: DepartementService, private equipeService: EquipeService,
    private planificationService: PlanificationService) {

  }

  setInputTitres() {
    this.planificationService.getPlans({
      date: this.enteteProdData ? this.enteteProdData.date_production : this.response.data.enteteProduction?.date_production,
      dep: this.enteteProdData ? this.enteteProdData.idDepartement : this.response.data.departement?.id_departement
    }).subscribe({
      next: response => {
        this.titreService.getTitresFil().subscribe({
          next: resp => {
            this.titresFil = resp.data.titresFil!
            if (history.state.action == 'add') {
              for (let item of (response as any).data.plans) {
                if (item.plan.length == 0) {
                  this.inputTitre.push(null);
                  this.inputObjectifProd.push(0);
                }
                else {
                  this.inputTitre.push(this.titresFil.find(element => element.id_titre == item.plan[0].titre)!.id_titre);
                  this.inputObjectifProd.push(item.plan[0]["Kg_standard"]);
                }
              }
            }
            else {
              for (let item of this.response.data.detailsProduction!){
                this.inputTitre.push(item.titre_fil!);
                this.inputObjectifProd.push(item.objectif_production);
              }
            }
          },
          error: err => {
            console.log(err);
          }
        });
      }
    })
  }

  getEntities() {
    let idDep: number;
    let idEquipe: number;

    if (this.enteteProdData) {
      idDep = this.enteteProdData.idDepartement;
      idEquipe = this.enteteProdData.idEquipe;
      this.dateProduction = this.enteteProdData.date_production;
    }
    else {
      idDep = this.response.data.enteteProduction!.departement;
      idEquipe = this.response.data.enteteProduction!.equipe;
      this.dateProduction = new Date(this.response.data.enteteProduction!.date_production).toISOString().slice(0, 10);
    }

    this.depService.getDepartementById(idDep).subscribe({
      next: response => {
        this.departement = response.data.departement!;
        if (this.departement.id_departement != 4
          && this.departement.id_departement != 5
          && this.departement.id_departement != 6)
          this.isDepFilature = true;
        this.machineService.getMachinesByDep(this.departement.id_departement).subscribe({
          next: response => {
            this.machines = response.data.machines!
          },
          error: err => {
            console.log(err);
          }
        });
      },
      error: err => {
        console.log(err);
      }
    });

    this.equipeService.getEquipeById(idEquipe).subscribe({
      next: response => {
        this.equipe = response.data.equipe!
      },
      error: err => {
        console.log(err);
      }
    });
  }



  setInputLevata() {
    if (this.response) {
      if (this.response.data.detailsProduction) {
        const detailsProduction = this.response.data.detailsProduction as DetailsProduction[];

        detailsProduction.forEach(detail => {
          this.nbLevatas.push(detail.nb_levata);
        });

        this.nbLevatas.forEach(nb => {
          this.inputLevata.push(nb);
        });
      }
    }
  }


  setFormData(response: BackendResponse): void {
    this.machines.forEach(machine => {
      const productionDetail: {
        nbLevata: number,
        id_entete: number,
        numero_machine: number,
        systeme: number,
        titre: number | null,
        objectif_production: number
      } = {
        nbLevata: this.inputLevata[this.machines!.indexOf(machine)],
        id_entete: response.data.enteteProduction!.id_entete,
        numero_machine: machine.numero,
        systeme: machine.systeme,
        titre: this.inputTitre.length !== 0 ? this.inputTitre[this.machines!.indexOf(machine)] : null,
        objectif_production: this.inputObjectifProd[this.machines!.indexOf(machine)]
      };
      this.formData.productionDetails.push(productionDetail);
    });
  }

  createDetailsProduction(formData: any, myForm: NgForm) {
    console.log(this.enteteProdData);
    console.log(history.state);
    console.log(myForm)
    if (!myForm.valid)
      this.popUpService.showFail("Tous les details sont requises")
    else {
      if (history.state.action == 'add')
        this.prodService.saveEnteteProduction(this.enteteProdData).subscribe({
          next: (response: BackendResponse) => {
            this.setFormData(response);
            console.log(this.formData)
            this.prodService.saveDetailsProduction(this.formData).subscribe(
              response => {
                this.popUpService.showSuccess(response.message);
                this.router.navigate(['liste-productions']);
              }
            )
          },
          error: err => {
            console.error(err);
            this.popUpService.showFail("Erreur serveur");
          }
        });
      else {
        this.setFormData(history.state.response);
        console.log(this.formData)
        this.prodService.editDetailsProduction(this.formData, this.response.data.enteteProduction!.id_entete).subscribe(
          response => {
            console.log(response)
            this.popUpService.showSuccess(response.message);
            this.router.navigate(['liste-productions']);
          }
        )
      }
    }
  }
}