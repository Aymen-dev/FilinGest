import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';




import { DepartementService } from '../services/departement.service';
import { PopUpService } from '../services/pop-up.service';
import { ModeleService } from '../services/modele.service';
import { ServicesMarqueService } from '../services/marque.service';

@Component({
  selector: 'app-liste-dynamique',
  templateUrl: './liste-dynamique.component.html',
  styleUrl: './liste-dynamique.component.css'
})
export class ListeDynamiqueComponent{
  selectedEntity: any;
  currentEntity: any;
  entityList: any[] = []
  service: any
  suffixe = ""
  suffixe2 = "u "
  shows = [false, false, false]
  @Input() data: any;
  constructor(private fb: FormBuilder, private serviceNot: PopUpService,
    private serviceDep: DepartementService,
    private serviceMarq: ServicesMarqueService,
    private serviceMod: ModeleService) { }

  

  ngOnChanges(changes: SimpleChanges) {
    console.log('1', this.data);
    if (changes['data']) {
      console.log('2', this.data);
      var init = changes['data'].currentValue;
      console.log(init)
      if (init == "Département") {
        this.service = this.serviceDep
        this.service.getAll().subscribe(
          (res: any) => {
            this.fromDeptToEntity(res.data)
          }
        );
      } else if (init == "Marque") {
        this.suffixe = "e"
        this.suffixe2 = "e la "
        this.service = this.serviceMarq
        this.service.getAll().subscribe(
          (res: any) => {
            console.log(res.data);
            this.fromMarqToEntity(res.data)
            console.log(this.entityList);
          }
        );
      } else if (init == "Model") {
        this.service = this.serviceMod
        this.service.getAll().subscribe(
          (res: any) => {
            this.fromModToEntity(res.data)
          }
        );
      }
      this.selectedEntity = this.entityList[0].id
      this.updateCurrentEntity()
    }
  }

  

  fromDeptToEntity(data: any) {
    var liste: any[] = []
    for (let obj of data) {
      liste.push({ "id": obj.idDepartement, "intitule": obj.nomDepartement })
    }
    this.entityList = liste
    console.log(this.entityList)
  }

  fromMarqToEntity(data: any) {
    var liste: any[] = []
    for (let obj of data) {
      liste.push({ "id": obj.id_marque, "intitule": obj.nom_marque })
    }
    this.entityList = liste
  }

  fromModToEntity(data: any) {
    var liste: any[] = []
    for (let obj of data) {
      liste.push({ "id": obj.idmodelMachine, "intitule": obj.nomModel })
    }
    this.entityList = liste
  }

  buttonAction(value: any) {
    for (let i = 0; i < this.shows.length; i++) {
      if (i == value) {
        this.shows[i] = !this.shows[i]
      } else {
        this.shows[i] = false
      }
    }
  }

  updateEntity(selectedEntity: any) {
    var body;
    if (this.data == "Département") {
      body = { "nom_departement": this.currentEntity }
    } else if (this.data == "Marque") {
      body = { "nom_marque": this.currentEntity }
    } else if (this.data == "Model") {
      body = { "nom_modele": this.currentEntity }
    }
    const result = confirm("Êtes-vous sûr(e) de vouloir modifier l'entité sélectionnée?:");
    if (result) {
      this.service.modify(body, selectedEntity).subscribe(
        (res: any) => {
          if (res.message == "Data updated successfully") {
            if (this.data == "Département") {
              this.fromDeptToEntity(res.data)
            } else if (this.data == "Marque") {
              this.fromMarqToEntity(res.data)
            } else if (this.data == "Model") {
              this.fromModToEntity(res.data)
            }
            var msg = this.data + " modifié" + this.suffixe + " avec succés"
            this.serviceNot.showSuccess(msg)
          } else {
            var msg = "Erreur lors de la modification, essayer encore"
            this.serviceNot.showFail(msg)
          }
        }
      )
    }
  }

  removeEntity() {
    const result = confirm("Êtes-vous sûr(e) de vouloir supprimer l'entité sélectionné?");
    if (result) {
      this.service.delete(this.selectedEntity).subscribe(
        (res: any) => {
          if (res.message == "Data deleted successfully") {
            if (this.data == "Département") {
              this.fromDeptToEntity(res.data)
            } else if (this.data == "Marque") {
              this.fromMarqToEntity(res.data)
            } else if (this.data == "Model") {
              this.fromModToEntity(res.data)
            }
            this.selectedEntity = this.entityList[0].id
            var msg = this.data + " supprimé" + this.suffixe + " avec succés"
            this.serviceNot.showSuccess(msg)
          } else if (res.message == ("warning this " + this.data + " is referenced.")) {
            this.serviceNot.showFail("Attention! " + this.data + " est référencé" + this.suffixe)
          } else {
            var msg = "Erreur lor de la suppression, essayer encore"
            this.serviceNot.showFail(msg)
          }
        }
      )
    }

  }
  updateCurrentEntity() {
    for (let i of this.entityList) {
      if (i.id == this.selectedEntity) {
        this.currentEntity = i.intitule
      }
    }
  }

}