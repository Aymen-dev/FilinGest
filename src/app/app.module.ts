import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AjoutDynamiqueComponent } from './ajout-dynamique/ajout-dynamique.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { EnteteProductionComponent } from './entete-production/entete-production.component';
import { DetailsProductionComponent } from './details-production/details-production.component';
import { PodiumComponent } from './podium/podium.component';
import { ListeProductionsComponent } from './liste-productions/liste-productions.component';
import { ViewDetailsProductionComponent } from './view-details-production/view-details-production.component';
import { AdminComponent } from './admin/admin.component';
import { ListeDynamiqueComponent } from './liste-dynamique/liste-dynamique.component';
import { AjoutMachineComponent } from './ajout-machine/ajout-machine.component';
import { ListeMachinesComponent } from './liste-machines/liste-machines.component';




@NgModule({
  declarations: [
    AppComponent,
    AjoutDynamiqueComponent,
    NavbarComponent,
    HomeComponent,
    EnteteProductionComponent,
    DetailsProductionComponent,
    PodiumComponent,
    ListeProductionsComponent,
    ViewDetailsProductionComponent,
    AdminComponent,
    ListeDynamiqueComponent,
    AjoutMachineComponent,
    ListeMachinesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterOutlet,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }