import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-details-production',
  templateUrl: './view-details-production.component.html',
  styleUrl: './view-details-production.component.css'
})
export class ViewDetailsProductionComponent {

  @Input()
  response: any;
  
  dep: any;
  machines: any;
  details: any;

  ngOnChanges(){
    this.getResponse();
  }

  getResponse(){
    this.dep = this.response.departement;
    this.machines = this.response.machines;
    this.details = this.response.data;

    console.log(this.dep, this.machines, this.details);
  }

}
