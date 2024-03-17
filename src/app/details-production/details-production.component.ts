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



@Component({
  selector: 'app-details-production',
  templateUrl: './details-production.component.html',
  styleUrl: './details-production.component.css'
})
export class DetailsProductionComponent implements OnInit {

  machines: Array<Machine> | undefined = [];
  departement: Departement | undefined;
  equipe: Equipe | undefined;
  titresFil: Array<TitreFil> = [];
  inputLevata: Array<number> = [];
  inputTitre: Array<number> = [];
  nbLevatas: Array<number> = [];

  enteteProdData = {
    equipe: 0,
    departement: 0,
    superviseur: 0,
    team_leader: 0,
    date_production: ''
  };

  response!: BackendResponse;

  isDepFilature: boolean = false;

  formData: any = {
    productionDetails: []
  };

  ngOnInit(): void {
    this.enteteProdData = history.state.enteteProdData;
    console.log(this.enteteProdData)
    this.getMachines();
    this.checkDepartment();
    this.init();
    this.setInputLevata();
    this.getTitres();
  }


  constructor(private route: ActivatedRoute, private router: Router,
    private machineService: MachineService, private prodService: ProductionService,
    private titreService: TitreFilService, private popUpService: PopUpService,
    private depService: DepartementService, private equipeService: EquipeService) {

  }

  init() {
    this.depService.getDepartementById(this.enteteProdData.departement).subscribe({
      next: response => {
        this.departement = response.data.departement
      },
      error: err => {
        console.log(err);
      }
    })
    this.equipeService.getEquipeById(this.enteteProdData.equipe).subscribe({
      next: response => {
        this.equipe = response.data.equipe
      },
      error: err => {
        console.log(err);
      }
    })
  }

  checkDepartment() {
    if (this.enteteProdData.departement)
      if (this.enteteProdData.departement != 4 && this.enteteProdData.departement != 5 && this.enteteProdData.departement != 6)
        this.isDepFilature = true;
  }

  setInputLevata() {
    if (this.response)
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

  getMachines() {
    this.machineService.getMachinesByDep(this.enteteProdData.departement).subscribe({
      next: response => {
        this.machines = response.data.machines
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getTitres() {
    this.titreService.getTitresFil().subscribe(
      response => {
        this.titresFil = (response as any).data;
      }
    )
  }

  ajouterPanne() {

  }


  createDetailsProduction(formData: any) {
    this.prodService.saveEnteteProduction(this.enteteProdData).subscribe({
      next: (response: BackendResponse) => {
        this.response = response;
        if (this.machines)
          this.machines.forEach(machine => {
            const productionDetail = {
              nbLevata: this.inputLevata[this.machines!.indexOf(machine)],
              id_entete: this.response.data.enteteProduction?.id_entete,
              numero_machine: machine.numero,
              systeme: machine.systeme,
              titre: this.inputTitre.length != 0 ? this.inputTitre[this.machines!.indexOf(machine)] : null
            };
            this.formData.productionDetails.push(productionDetail);
          });


        if (!this.response.data.detailsProduction) {
          this.prodService.saveDetailsProduction(this.formData).subscribe(
            response => {
              this.popUpService.showSuccess(response.message);
              this.router.navigate(['liste-productions']);
            }
          )
        }
        else {
          this.prodService.editDetailsProduction(this.formData, this.formData.productionDetails[0].id_entete).subscribe(
            response => {
              this.popUpService.showSuccess(response.message);
              this.router.navigate(['liste-productions']);
            }
          )
        }
      },
      error: (error: any) => {
        console.error("Error:", error);
        this.popUpService.showFail("Erreur serveur");
      }
    });
  }
}
