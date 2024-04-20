import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Departement } from '../models/departement.model';
import { DepartementService } from '../services/departement.service';
import { EquipeService } from '../services/equipe.service';
import { Equipe } from '../models/equipe.model';
import { Personnel } from '../models/personnel.model';
import { PersonnelService } from '../services/personnel.service';
import { EnteteProductionService } from '../services/entete-production.service';
import { ProductionService } from '../services/production.service';
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

  productions: {
    equipeJour: Array<number>,
    equipeMidi: Array<number>,
    equipeNuit: Array<number>
  } = {
      equipeJour: [],
      equipeMidi: [],
      equipeNuit: []
    }

  equipes: {
    equipeJour: Array<Personnel>,
    equipeMidi: Array<Personnel>,
    equipeNuit: Array<Personnel>
  } = {
      equipeJour: [],
      equipeMidi: [],
      equipeNuit: []
    }

  rankings!: {
    first: {
      supervisor: Personnel,
      teamLeader: Personnel,
      prodMoyenne: number,
      prodMensuelle: number
    },
    second: {
      supervisor: Personnel,
      teamLeader: Personnel,
      prodMoyenne: number,
      prodMensuelle: number
    },
    third: {
      supervisor: Personnel,
      teamLeader: Personnel,
      prodMoyenne: number,
      prodMensuelle: number
    }
  }
  selectedDepId: number = 0;

  constructor(private depService: DepartementService,
    private equipeService: EquipeService,
    private personnelService: PersonnelService,
    private enteteProdService: EnteteProductionService,
    private productionService: ProductionService) { }

  ngOnInit() {
    this.loadDepartements();
    this.rankings = {
      first: {
        supervisor: {} as Personnel,
        teamLeader: {} as Personnel,
        prodMoyenne: 0,
        prodMensuelle: 0
      },
      second: {
        supervisor: {} as Personnel,
        teamLeader: {} as Personnel,
        prodMoyenne: 0,
        prodMensuelle: 0
      },
      third: {
        supervisor: {} as Personnel,
        teamLeader: {} as Personnel,
        prodMoyenne: 0,
        prodMensuelle: 0
      }
    };
  }


  loadDepartements() {
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


  loadPersonnel(depId: number): void {
    this.equipeService.getListeEquipesByDep(depId).subscribe({
      next: response => {
        if (response.data.equipes) {
          for (let equipe of response.data.equipes) {
            this.personnelService.getListePersonnelByEquipe(equipe.id_equipe).subscribe({
              next: response => {
                if (response.data.personnel)
                  this.equipes[this.getSeanceEquipe(equipe.nom_equipe) as keyof typeof this.equipes] = response.data.personnel
              },
              error: err => {
                console.error(err);
              }
            })
          }
        }
      },
      error: err => {
        console.error(err);
      }
    });
  }


  loadProductions(depId: number) {
    this.productions.equipeJour = [];
    this.productions.equipeMidi = [];
    this.productions.equipeNuit = [];

    this.enteteProdService.getEntetesForCurrentMonthByDep(depId).subscribe({
      next: response => {
        if (response.data.entetesProduction) {
          for (let entete of response.data.entetesProduction) {
            this.productionService.getDetailsProductionByEnteteId(entete.id_entete).subscribe({
              next: response => {
                let prodJournaliere = 0;
                for (let detail of response.data.detailsProduction!)
                  prodJournaliere += detail.production;
                switch (response.data.equipe?.nom_equipe) {
                  case 'Equipe jour':
                    this.productions.equipeJour.push(prodJournaliere);
                    break;
                  case 'Equipe midi':
                    this.productions.equipeMidi.push(prodJournaliere);
                    break;
                  case 'Equipe nuit':
                    this.productions.equipeNuit.push(prodJournaliere);
                    break;
                }
              },
              error: err => {
                console.error(err);
              }
            })
          }
        }
      },
      error: err => {
        console.error(err)
      }
    })
  }


  getSeanceEquipe(equipeName: string): string {
    switch (equipeName) {
      case 'Equipe jour':
        return 'equipeJour';
      case 'Equipe midi':
        return 'equipeMidi';
      case 'Equipe nuit':
        return 'equipeNuit';
      default:
        return '';
    }
  }

  calculateProdMensuelle(equipe: string): number {
    let sum;
    switch (equipe) {
      case 'jour':
        sum = this.productions.equipeJour.reduce(
          (acc, value) => acc + value, 0
        )
        break;
      case 'midi':
        sum = this.productions.equipeMidi.reduce(
          (acc, value) => acc + value, 0
        )
        break;
      case 'nuit':
        sum = this.productions.equipeNuit.reduce(
          (acc, value) => acc + value, 0
        )
        break;
    }
    return sum!;
  }

  calculateMean(arr: number[]): number {
    if (arr.length === 0) {
      return 0; 
    }
    const sum = arr.reduce((acc, value) => acc + value, 0);
    return sum / arr.length;
  }

  calculateRankings(){
    let prods: any = {
      equipeJour: {
        prodMensuelle: this.calculateProdMensuelle('jour'),
        prodMoyenne: this.calculateMean(this.productions.equipeJour)
      },
      equipeMidi: {
        prodMensuelle: this.calculateProdMensuelle('midi'),
        prodMoyenne: this.calculateMean(this.productions.equipeMidi)
      },
      equipeNuit: {
        prodMensuelle: this.calculateProdMensuelle('nuit'),
        prodMoyenne: this.calculateMean(this.productions.equipeNuit)
      }
    }

    let rankingsArray = Object.keys(prods).map(key => ({ team: key, prodMensuelle: prods[key].prodMensuelle }));

    // Sort the array in descending order based on prodMensuelle values
    rankingsArray.sort((a, b) => b.prodMensuelle - a.prodMensuelle);

    // Assign the top three rankings to the first, second, and third properties
    this.rankings.first = prods[rankingsArray[0].team];
    this.rankings.second = prods[rankingsArray[1].team];
    this.rankings.third = prods[rankingsArray[2].team];

    console.log(this.rankings)
  }

}
