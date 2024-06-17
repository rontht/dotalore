import { Injectable } from '@angular/core';
import { HEROES } from '../database/hero_database';
import { ITEMS } from '../database/item_database';
import { ModalController } from '@ionic/angular/standalone';
import { ExpandedHeroPage } from '../modals/expanded-hero/expanded-hero.page';
import { ExpandedItemPage } from '../modals/expanded-item/expanded-item.page';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  heroes = HEROES;
  items = ITEMS;
  isEmpty: boolean = true;

  constructor(private modalCtrl: ModalController) { }

  async openHeroCard(index: number) {
    await this.modalCtrl.create({
      component: ExpandedHeroPage,
      componentProps: this.heroes[index]
    }).then(modal => {
      modal.onDidDismiss().then((retval) => {
        this.heroes[index] = retval.data
      });
      modal.present();
    })
  }

  async openItemCard(index: number) {
    await this.modalCtrl.create({
      component: ExpandedItemPage,
      componentProps: this.items[index]
    }).then(modal => {
      modal.present();
    })
  }

  checkFavourites() {
    var favourites = this.heroes.filter(x => x.starred === true);
    if (favourites.length < 1) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
    return [favourites, this.isEmpty]
  }
}
