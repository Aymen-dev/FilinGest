import { Component, Input, SimpleChanges } from '@angular/core';
import { Machine } from '../models/machine.model';
import { MachineService } from '../services/machine.service';
import { ProductionService } from '../services/production.service';
import { TitreFilService } from '../services/titre-fil.service';


@Component({
  selector: 'app-details-production',
  templateUrl: './details-production.component.html',
  styleUrl: './details-production.component.css'
})
export class DetailsProductionComponent {

  machines: Array<Machine> = [];
  titresFil: Array<any> = [];
  inputLevata: Array<number> = [];
  inputTitre: Array<number> = [];
  nbLevatas: Array<number> = [];


  @Input()
  response: any;

  isDepFilature: boolean = false;
  showResponseMessage: boolean = false;
  message: string = '';

  formData: any = {
    productionDetails: []
  };


  ngOnChanges(changes: SimpleChanges) {
    if (changes['responseData'] && !changes['responseData'].firstChange)
      this.getMachines();
    if (changes['responseData'] && !changes['responseData'].firstChange)
      this.checkDepartment();
    if (changes['responseData'] && !changes['responseData'].firstChange)
      this.setInputLevata();

    this.getTitres();
    
  }


  constructor(private machineService: MachineService, private prodSerivce: ProductionService, private titreService: TitreFilService) {
  }

  checkDepartment() {
    if (this.response.departement.id_departement != 4 && this.response.departement.id_departement != 5 && this.response.departement.id_departement != 6)
      this.isDepFilature = true;
  }

  setInputLevata() {
    this.nbLevatas = this.response.data;
    this.nbLevatas.forEach(element => {
      this.inputLevata.push((element as any).nb_levata);
    });
  }

  getMachines() {
    this.machineService.getMachinesByDep(this.response.departement.id_departement).subscribe(
      response => {
        this.machines = response.machines
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

    /*
    Pour chaque machine retrouvée, 
    creer un detail de production correspondant et l'ajouter au tableau à envoyer dans la requete post.
    */

    this.machines.forEach(machine => {
      const productionDetail = {
        nbLevata: this.inputLevata[this.machines.indexOf(machine)],
        id_entete: this.response.entete.id_entete,
        numero_machine: machine.numero,
        systeme: machine.systeme,
        titre: this.inputTitre.length != 0 ? this.inputTitre[this.machines.indexOf(machine)] : null
      };
      this.formData.productionDetails.push(productionDetail);
    });

    /*
    Envoyer la requete
    */
    if (!this.response.data) { //si la reponse ne contient pas le champs 'data' (champ 'data' = nbLevata retrouvé)
      this.prodSerivce.saveDetailsProduction(this.formData).subscribe(
        response => {
          this.message = (response as any).message;
          this.showResponseMessage = true;
        }
      )
    }
    else {
      this.prodSerivce.editDetailsProduction(this.formData, this.formData.productionDetails[0].id_entete).subscribe(
        response => {
          this.showResponseMessage = true;
          this.message = (response as any).message;
        }
      )
    }

  }
}
