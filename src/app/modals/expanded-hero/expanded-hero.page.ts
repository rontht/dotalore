import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonRow, IonTitle, IonToolbar, ModalController, NavParams } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBack, star, starOutline } from 'ionicons/icons';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-expanded-hero',
  templateUrl: './expanded-hero.page.html',
  styleUrls: ['./expanded-hero.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon,
    IonLabel, IonList, IonItem, IonGrid, IonRow, IonCol]
})
export class ExpandedHeroPage implements OnInit {

  hero: any = {};
  filledStar = true;
  outlineStar = false;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {
    addIcons({ chevronBack, starOutline, star });
    this.hero = this.navParams.data;
    this.pickRates = this.hero.pickRates;
    this.winRates = this.hero.winRates;

    if (this.hero.starred == true) {
      this.filledStar = false;
      this.outlineStar = true;
    } else if (this.hero.starred == false) {
      this.filledStar = true;
      this.outlineStar = false;
    }
  }

  // App Crash when closing the modal without using back button.
  closePopUp() {
    this.modalCtrl.dismiss({
      id: this.hero.id,
      name: this.hero.name,
      attributeType: this.hero.attributeType,
      theme: this.hero.theme,
      tag: this.hero.tag,
      shortDescription: this.hero.shortDescription,
      description: this.hero.description,
      realName: this.hero.realName,
      history1: this.hero.history1,
      history2: this.hero.history2,
      history3: this.hero.history3,
      history4: this.hero.history4,
      profilePic: this.hero.profilePic,
      bodyPic: this.hero.bodyPic,
      attributePic: this.hero.attributePic,
      starred: this.hero.starred,
      winRates: this.hero.winRates,
      pickRates: this.hero.pickRates
    });
  }

  favourite() {
    if (this.hero.starred == true) {
      this.hero.starred = false;
      this.filledStar = true;
      this.outlineStar = false;
    } else if (this.hero.starred == false) {
      this.hero.starred = true;
      this.filledStar = false;
      this.outlineStar = true;
    }
  }

  @ViewChild('heroPickWinRates', { static: true })
  canvas: any;
  chart: any;
  pickRates: any;
  winRates: any;
  rankTiers = ["Crusader", "Archon", "Legend", "Ancient", "Divine"];
  plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart: any, options: any) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color || '#fcfcfc';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };

  ngOnInit() {
    var configuration: any = {
      type: 'bar',
      data: {
        labels: this.rankTiers,
        datasets: [
          {
            label: 'Pick Rate',
            data: this.pickRates,
            borderColor: 'red',
            backgroundColor: '#ff5e71',
          },
          {
            label: 'Win Rate',
            data: this.winRates,
            borderColor: 'green',
            backgroundColor: '#7eff5e'
          }
        ]
      },
      options: {
        scales: {
          y: {
            border: {
              color: 'black',
            },
            grid: {
              color: 'white',
            }
          },
          x: {
            grid: {
              color: 'black',
            }
          }
        },
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 1,
            borderRadius: 5,
            borderSkipped: false,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
            }
          },
          title: {
            display: true,
            text: 'Pick and Win Rates, May 2024'
          },
        },
      },
      plugins: [this.plugin]
    }
    this.chart = new Chart(this.canvas.nativeElement, configuration);
  }
}
