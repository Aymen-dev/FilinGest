import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { DetailsProductionComponent } from './details-production/details-production.component';
import { EnteteProductionComponent } from './entete-production/entete-production.component';
import { PodiumComponent } from './podium/podium.component';
import { ListeProductionsComponent } from './liste-productions/liste-productions.component';
import { ListeDynamiqueComponent } from './liste-dynamique/liste-dynamique.component';
import { AdminComponent } from './admin/admin.component';
import { ListeMachinesComponent } from './liste-machines/liste-machines.component';
import { ViewDetailsProductionComponent } from './view-details-production/view-details-production.component';




const routes: Routes = [
  { path: 'details-production', component: DetailsProductionComponent },
  { path: 'entete-production', component: EnteteProductionComponent },
  { path: 'podium', component: PodiumComponent },
  { path: 'liste-productions', component: ListeProductionsComponent },
  { path: 'liste-dynamique/:data', component: ListeDynamiqueComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'liste-machines', component: ListeMachinesComponent },
  { path: 'view-details-production', component: ViewDetailsProductionComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterOutlet],
  exports: [RouterModule]
})
export class AppRoutingModule { }
