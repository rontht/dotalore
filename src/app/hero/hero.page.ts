import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonList, IonRow } from '@ionic/angular/standalone';
import { HEROES } from '../database/hero_database';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { MenuComponent } from '../components/menu/menu.component';
import { CardService } from '../services/card.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.page.html',
  styleUrls: ['./hero.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, CommonModule, FormsModule, MenuComponent, ToolbarComponent, IonGrid, IonRow, IonCol, IonItem, IonList, IonCard, IonButton]
})

export class HeroPage implements OnInit {
  username: string | null = null;
  routeParamSubscription: any;
  heroes = HEROES;
  toggle: boolean = false;

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeParamSubscription = this.route.params.subscribe(params => {
      this.username = params['username'];
    });
  }

  // Open modal and received data from modal
  async expandHeroCard(index: number) {
    this.cardService.openHeroCard(index);
  }
}
