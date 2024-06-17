import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonItem, IonList, IonTitle } from '@ionic/angular/standalone';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { MenuComponent } from '../components/menu/menu.component';
import { CardService } from '../services/card.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-faction',
  templateUrl: './faction.page.html',
  styleUrls: ['./faction.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, CommonModule, FormsModule, IonItem, IonList, ToolbarComponent, MenuComponent]
})

export class FactionPage implements OnInit {
  username: string | null = null;
  routeParamSubscription: any;

  constructor(private cardService: CardService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.routeParamSubscription = this.route.params.subscribe(params => {
      this.username = params['username'];
    });
  }

  async expandHeroCard(index:number) {
    this.cardService.openHeroCard(index);
  }
}
