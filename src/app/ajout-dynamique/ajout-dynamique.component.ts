import { Component, Input} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopUpService } from '../services/pop-up.service';

@Component({
  selector: 'app-ajout-dynamique',
  templateUrl: './ajout-dynamique.component.html',
  styleUrl: './ajout-dynamique.component.css'
})
export class AjoutDynamiqueComponent {
  @Input() criteria:any;
  @Input() suffixe:any;
  @Input() service:any
  @Input() entityList:any

  form!:FormGroup;
  constructor(private fb: FormBuilder,private serviceNot:PopUpService){}
  ngOnChanges(){
    this.form = this.fb.group({
      insertValues: this.fb.array([]),
    });
    this.addValue();
  }
  get insertValues(): FormArray {
    return this.form.get('insertValues') as FormArray;
  }

  addValue() {
    if(this.form.valid){
      const newValue = this.fb.group({
        intitule: ['', Validators.required],
      });
      this.insertValues.push(newValue);
    }
  }

  removeDept() {
    this.insertValues.removeAt(this.insertValues.length-1)
  }
  
  fromEntitytoTargetList(values:any){
    var liste=[]
    if(this.criteria=="Département"){
      for(let i of values){
        let body={"nomDepartement":i.intitule}
        liste.push(body)
      }
    }else if(this.criteria=="Marque"){
      for(let i of values){
        let body={"nomMarque":i.intitule}
        liste.push(body)
      }
    }else if(this.criteria=="Model"){
      for(let i of values){
        var body={"nomModel":i.intitule}
        liste.push(body)
      }
    }
    return liste
  }
  cleanDepList(){
    const newList=this.entityList.map((item:{nomDepartement:string})=>({
      intitule: item.nomDepartement.replace(/\s+/g, ''),
    }));
    return newList
  }
  cleanModList(){
    const newList=this.entityList.map((item:{nomModel:string})=>({
      intitule: item.nomModel.replace(/\s+/g, ''),
    }));
    return newList
  }

  cleanMarqueList(){
    const newList=this.entityList.map((item:{nomMarque:string})=>({
      intitule: item.nomMarque.replace(/\s+/g, ''),
    }));
    return newList
  }

  submitForm(){
    console.log(this.entityList)
    if(this.form.valid){
      var i=0
      var find=false
      var element
      const newList=this.entityList.map((item:{intitule:string})=>({
        intitule: item.intitule.replace(/\s+/g, ''),
      }));
      const newList2 = this.form.value.insertValues.map((item: { intitule: string}) => ({
        intitule: item.intitule.replace(/\s+/g, ''),
      }));
      while(i < newList2.length && find==false){
        element=newList.find((element: {intitule:string }) => element.intitule == newList2[i].intitule);
        if(element!=undefined){
          find=true
        }
        i++
      }
      if(find==true){
        console.log(element)
        this.serviceNot.showFail("un"+this.suffixe+" "+this.criteria+" existe deja avec ce nom")
      }else{
        var body=this.fromEntitytoTargetList(this.form.value.insertValues)
        this.service.add(body).subscribe(
           (res:any)=>{
             if(res.message=="Bulk insert successful"){
              setTimeout(() => {
                window.location.reload();
              }, 2000);              
                this.serviceNot.showSuccess(this.criteria+"(s) ajouté"+this.suffixe+"(s) avec succés")
              }else{
                this.serviceNot.showFail("Erreur lors de l'ajout, essayer encore")
             }
           }
         );
      }
    }else{
       this.serviceNot.showFail("Attention! respectez les régles d'insertion pour les "+this.criteria+"s")
    }     
  }
}