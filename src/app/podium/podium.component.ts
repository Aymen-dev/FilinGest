import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Departement } from '../models/departement.model';
import { DepartementService } from '../services/departement.service';
import { EquipeService } from '../services/equipe.service';
import { Equipe } from '../models/equipe.model';
import { Personnel } from '../models/personnel.model';
import { PersonnelService } from '../services/personnel.service';
/*import { Chart } from 'chart.js';*/

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrl: './podium.component.css'
})
export class PodiumComponent implements OnInit {
  /*ngAfterViewInit() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas element not found.');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get 2D context for canvas.');
      return;
    }
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }*/

  departements: Departement[] = new Array<Departement>;
  equipes: Equipe[] = new Array<Equipe>;
  personnel: {
    pJour: Array<Personnel>,
    pMidi: Array<Personnel>,
    pNuit: Array<Personnel>
  } = {
      pJour: [],
      pMidi: [],
      pNuit: []
    }
  selectedDepId: number = 0;

  constructor(private depService: DepartementService,
    private equipeService: EquipeService,
    private personnelService: PersonnelService) { }

  ngOnInit() {
    this.loadListeDepartements();
  }

  loadListeDepartements() {
    this.depService.getListeDepartements().subscribe({
      next: response => {
        if (response.data.departements)
          this.departements = response.data.departements;
      },
      error: err => {
        console.error(err);
      }
    })
  }

  getSeanceEquipe(equipeName: string): string {
    switch (equipeName) {
      case 'Equipe jour':
        return 'pJour';
      case 'Equipe midi':
        return 'pMidi';
      case 'Equipe nuit':
        return 'pNuit';
      default:
        return '';
    }
  }

  loadListeEquipes(depId: number) {
    this.equipeService.getListeEquipesByDep(depId).subscribe({
      next: response => {
        if (response.data.equipes) {
          this.equipes = response.data.equipes;
          this.loadListePersonnel();
        }
      },
      error: err => {
        console.error(err);
      }
    });
  }

  loadListePersonnel(): void {
    for (let equipe of this.equipes) {
      this.personnelService.getListePersonnelByEquipe(equipe.id_equipe).subscribe({
        next: response => {
          if (response.data.personnel)
            this.personnel[this.getSeanceEquipe(equipe.nom_equipe) as keyof typeof this.personnel] = response.data.personnel
        },
        error: err => {
          console.error(err);
        }
      })
    }
  }
}
