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



@Component({
  selector: 'app-details-production',
  templateUrl: './details-production.component.html',
  styleUrl: './details-production.component.css'
})
export class DetailsProductionComponent implements OnInit {

  machines: Array<Machine> | undefined = [];
  titresFil: Array<TitreFil> = [];
  inputLevata: Array<number> = [];
  inputTitre: Array<number> = [];
  nbLevatas: Array<number> = [];


  @Input()
  response!: BackendResponse;

  isDepFilature: boolean = false;

  formData: any = {
    productionDetails: []
  };

  ngOnInit(): void {
    this.response = history.state.response;
    this.getMachines();
    this.checkDepartment();
    this.setInputLevata();
    this.getTitres();
  }


  constructor(private route: ActivatedRoute, private router: Router, private machineService: MachineService, private prodSerivce: ProductionService, private titreService: TitreFilService, private popUpService: PopUpService) {

  }

  checkDepartment() {
    if (this.response.data.departement)
      if (this.response.data.departement.id_departement != 4 && this.response.data.departement.id_departement != 5 && this.response.data.departement.id_departement != 6)
        this.isDepFilature = true;
  }

  setInputLevata() {
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
    this.machineService.getMachinesByDep(this.response.data.departement?.id_departement).subscribe(
      response => {
        this.machines = response.data.machines
      }
    )
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
      this.prodSerivce.saveDetailsProduction(this.formData).subscribe(
        response => {
          this.popUpService.showSuccess(response.message);
          this.router.navigate(['liste-productions']);
        }
      )
    }
    else {
      this.prodSerivce.editDetailsProduction(this.formData, this.formData.productionDetails[0].id_entete).subscribe(
        response => {
          this.popUpService.showSuccess(response.message);
          this.router.navigate(['liste-productions']);
        }
      )
    }

  }
}
