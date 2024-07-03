import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user-graph',
  standalone: true,
  imports: [ChartModule, ButtonModule],
  templateUrl: './user-graph.component.html',
  styleUrl: './user-graph.component.scss'
})
export class UserGraphComponent {
  age18to30!: number;
  age31to50!: number;
  age51to70!: number;
  basicData: any;

  basicOptions: any;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    const ageGroups = this.userService.filterUsersByAge();
    this.age18to30 = ageGroups.age18to30;
    this.age31to50 = ageGroups.age31to50;
    this.age51to70 = ageGroups.age51to70;

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


    /**
     * @note this basic dataset will display chart.
     */
    this.basicData = {
      labels: ['Age 18 to 30', '31 to 50', '51 to 70'],
      datasets: [
        {
          label: 'Sales',
          data: [this.age18to30, this.age31to50, this.age51to70],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    /**
     * @note this basic options will display chart.
     */
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  navList() {
    this.router.navigate(['home'])
  }

}
