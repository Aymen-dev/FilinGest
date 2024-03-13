import { Component } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopUpService } from '../services/pop-up.service';
import { MachineService } from '../services/machine.service';
import { ServicesMarqueService } from '../services/marque.service';
import { ModeleService } from '../services/modele.service';
import { DepartementService } from '../services/departement.service';

@Component({
  selector: 'app-liste-machines',
  templateUrl: './liste-machines.component.html',
  styleUrl: './liste-machines.component.css'
})
export class ListeMachinesComponent {

  machineForm!:FormGroup;
  machineList:any[]=["machine1","machine2"]

  departements:any[]=["dep5","dep2","dep3"]
  typeList:any[]=["type1","type2","type3"]
  modelList:any[]=["model1","model2","model3"]
  marqueList:any[]=["marque1","marque2","marque3"]
  Gstates:any[]=[]
  shows=[false,false,false]


  selectedMachine:any
  currentMachine:any
  currentMachineNom:any
  currentMachineCar:any
  currentMachineMode:any
  currentMachineMarq:any
  currentMachineType:any
  currentMachineDep:any
  currentMachineMatr:any
  currentMachineEtat:any
  states:any[]=[{"background":"aqua"},{"background":"transparent"}]

constructor(private fb: FormBuilder,private serviceNot:PopUpService,
    private serviceMachine:MachineService,
    private serviceMarq:ServicesMarqueService,
    private serviceMod:ModeleService,
    private serviceDep:DepartementService,
    private serviceMach:MachineService){}
ngOnInit(): void {
  this.serviceMach.getAll().subscribe(
    (res:any)=>{
     this.machineList=res.data
     this.selectedMachine=this.machineList[0].matricule
     this.updateCurrentMachine()
     }
   )
  this.serviceDep.getAll().subscribe(
   (res:any)=>{
    this.departements=res.data
    }
  )

  this.serviceMod.getAll().subscribe(
   (res:any)=>{
    this.modelList=res.data
    }
  )
  this.serviceMarq.getAll().subscribe(
   (res:any)=>{
    this.marqueList=res.data
   }
  )
  this.serviceMarq.getAll().subscribe(
   (res:any)=>{
    this.marqueList=res.data
   }
  )
  this.machineForm = this.fb.group({
   machines: this.fb.array([]),
  });
  }

 ngOnChanges(){
  this.machineForm = this.fb.group({
  machines: this.fb.array([]),
  });
 }
  get machines() {
   return this.machineForm.get('machines') as FormArray;
  }
  buttonAction(value:any){
    for(let i=0;i<this.shows.length;i++){
      if(i==value){
        this.shows[i]=!this.shows[i]
      }else{
        this.shows[i]=false
      }
    }
    if(value==1){
      this.updateCurrentMachine()
    }
}

updateCurrentMachine(){
   this.currentMachine=this.machineList.find((element: { matricule: any; }) => element.matricule == this.selectedMachine);
   
   this.currentMachineCar=this.currentMachine.caracteristiqueNumerique
   this.currentMachineDep=this.currentMachine.departement
   this.currentMachineMarq=this.currentMachine.marque
   this.currentMachineType=this.currentMachine.typeMachine
   this.currentMachineMode=this.currentMachine.modelMachine
   this.currentMachineNom=this.currentMachine.nomMachine
   this.currentMachineMatr=this.currentMachine.matricule
   if(this.currentMachine.etatMachine=="en Marche"){
     this.states[1].background="transparent"
     this.states[0].background="aqua"
   }else{
     this.states[1].background="aqua"
     this.states[0].background="transparent"
   }
}

addMachine() {
  const newMachine = this.fb.group({
  matricule: ['', Validators.required],
  etatMachine: ['en Marche'],
  nomMachine: ['', Validators.required],
  departement:[this.departements[0].idDepartement,Validators.required],
  typeMachine: [this.typeList[0].idType, Validators.required],
  modelMachine: [this.modelList[0].idmodelMachine, Validators.required],
  marque: [this.marqueList[0].idMarque, Validators.required],
  caracteristiqueNumerique:[0,Validators.required]
  });

 this.machines.push(newMachine);
 this.Gstates.push([{"background":"aqua"},{"background":"transparent"}])
 }

 removeMachine(){
 this.machines.removeAt(this.machines.length-1)
 }

focus2(value:any){
  if(value=="en Marche"){
    this.states[1].background="transparent"
    this.states[0].background="aqua"
  }else{
    this.states[1].background="aqua"
    this.states[0].background="transparent"
  }
  this.currentMachineEtat=value
  console.log(this.Gstates)
}

updateEntity(id:any){
  const result = confirm("Êtes-vous sûr(e) de vouloir modifier l'entité sélectionnée?:");
  if(result){
    var entity;
    entity={"nomMachine":this.currentMachineNom,"matricule":this.currentMachineMatr,
             "marque":this.currentMachineMarq,"modelMachine":this.currentMachineMode,
             "typeMachine":this.currentMachineType,"departement":this.currentMachineDep,
             "caracteristiqueNumerique":this.currentMachineCar,'etatMachine':this.currentMachineEtat}
    this.serviceMachine.modify(entity,id).subscribe(
     (res:any)=>{
       if(res.message=="Data updated successfully"){
         this.machineList=res.data
         this.serviceNot.showSuccess("Machine(s) modifiée(s) avec succés")
       }
     }
    );
  }

  }
  removeEntity(id:any){
    const result = confirm("Êtes-vous sûr(e) de vouloir supprimer l'entité sélectionné?");
    if(result){
      this.serviceMach.delete(id).subscribe(
        (res:any)=>{
          if(res.message=="Data deleted successfully"){
              this.machineList=res.data
              this.selectedMachine=this.machineList[0].matricule
              this.updateCurrentMachine()
            this.serviceNot.showSuccess("Machine supprimée avec succés")
          }else{
            this.serviceNot.showFail("Attention! cette machine est utilisée dans la production, effacer les details concernés d'abord.")
          }
        }
       );
    }

 }
}