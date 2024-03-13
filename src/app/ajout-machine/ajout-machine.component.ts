import { Component ,Input,OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';



import { DepartementService } from '../services/departement.service';
import { ModeleService } from '../services/modele.service';
import { ServicesMarqueService } from '../services/marque.service';
import { MachineService } from '../services/machine.service';
import { PopUpService } from '../services/pop-up.service';


@Component({
  selector: 'app-ajout-machine',
  templateUrl: './ajout-machine.component.html',
  styleUrl: './ajout-machine.component.css'
})
export class AjoutMachineComponent implements OnInit{

  machineForm!:FormGroup;
  @Input() machineList:any;


  departements:any[]=["dep5","dep2","dep3"]
  typeList:any[]=["type1","type2","type3"]
  modelList:any[]=["model1","model2","model3"]
  marqueList:any[]=["marque1","marque2","marque3"]
  Gstates:any[]=[]


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

  constructor(private fb: FormBuilder,private serviceNot:PopUpService,
              private serviceMachine:MachineService,
              private serviceMarq:ServicesMarqueService,
              private serviceMod:ModeleService,
              private serviceDep:DepartementService){}
  ngOnInit(): void {
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

  focus(value:any,ind:any){
    if(value=="en Marche"){
      this.Gstates[ind][1].background="transparent"
      this.Gstates[ind][0].background="aqua"
      this.machineForm.value.machines[ind].etatMachine="enMarche"

    }else{
      this.Gstates[ind][1].background="aqua"
      this.Gstates[ind][0].background="transparent"
      this.machineForm.value.machines[ind].etatMachine="en Arrét"
    }
    console.log(this.Gstates)
  }

  addMachine() {
    if(this.machineForm.valid){
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
  }

  removeMachine(){
    this.machines.removeAt(this.machines.length-1)
  }

  submitForm(){
    var insertVal=this.machineForm.value.machines;
    if(this.machineForm.valid){
      if(insertVal.length==0){
        this.serviceNot.showFail("Ajoutez au moin une machine d'abord")
      }else{
        var i=0
        var find=false
        var element
        const newList = this.machineList.map((item: { nomMachine: string; departement: any; }) => ({
          nomMachine: item.nomMachine.replace(/\s+/g, ''),
          departement: item.departement
        }));

        const newList2 = insertVal.map((item: { nomMachine: string; departement: any; }) => ({
          nomMachine: item.nomMachine.replace(/\s+/g, ''),
          departement: item.departement
        }));

        console.log(newList)
        while(i < newList2.length && find==false){
          element=newList.find((element: { nomMachine: any;departement:any }) => element.nomMachine == newList2[i].nomMachine && element.departement==newList2[i].departement);
          console.log("dep id:"+insertVal[i].departement+" nomMachine:"+newList2[i].nomMachine+" element:"+element)
          if(element!=undefined){
            find=true
          }
          i++
        }
        if(find==true){
         this.serviceNot.showFail("une machine existe deja avec le meme nom dans le département sélectionné")
        }else{
          this.serviceMachine.add(insertVal).subscribe(
            (res:any)=>{
              if(res.message=="Bulk insert successful"){
                  this.machineList=res.data
                  this.serviceNot.showSuccess("Machine(s) ajoutée(s) avec succés")
                  window.location.reload()
              }
            }
          );
        }
      }
    }else{
      var msg="Attention! veuillez suivre les règles de saisie pour les Machines";
      this.serviceNot.showFail(msg);  
    }      
  }


}