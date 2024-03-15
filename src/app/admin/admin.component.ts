import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  gererDep: boolean = false;
  gererMachine: boolean = false;
  gererMarque: boolean = false;
  gererModele: boolean = false;


  gererDepartements(){
    this.gererDep = true;
  }
  
  gererMachines() {
    this.gererMachine = true;
  }

  gererMarques() {
    this.gererMarque = true;
  }

  gererModeles() {
    this.gererModele = true;
  }
}
