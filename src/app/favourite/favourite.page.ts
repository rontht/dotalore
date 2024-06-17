import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCol, IonContent, IonGrid, IonHeader, IonRow, IonTitle, ModalController } from '@ionic/angular/standalone';
import { MenuComponent } from '../components/menu/menu.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { HEROES } from '../database/hero_database';
import { ExpandedHeroPage } from '../modals/expanded-hero/expanded-hero.page';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, CommonModule, FormsModule, MenuComponent, ToolbarComponent, IonCard, IonCol, IonRow, IonGrid]
})

export class FavouritePage implements OnInit {

  heroes = HEROES;
  getData: any;
  favourites: any;
  isEmpty: boolean = true;

  constructor(
    private modalCtrl: ModalController,
    private card: CardService
  ) {
    //Show Starred Heroes only
    this.getData = this.card.checkFavourites();
    this.favourites = this.getData[0];
    this.isEmpty = this.getData[1];
  }

  ngOnInit() {}

  // // Open modal and received data from modal
  async expandHeroCard(index: number) {
    // Find Actual Index of the Hero
    const actualIndex = this.heroes.findIndex(x => x.id === this.favourites[index].id)
    
    await this.modalCtrl.create({
      component: ExpandedHeroPage,
      componentProps: this.heroes[actualIndex]
    }).then(modal => {
      modal.onDidDismiss().then((retval) => {
        this.heroes[actualIndex] = retval.data;

        // Refresh Page onDidDismiss
        this.getData = this.card.checkFavourites();
        this.favourites = this.getData[0];
        this.isEmpty = this.getData[1];
      });
      modal.present();
    })
  }
}

