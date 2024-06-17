import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCol, IonContent, IonGrid, IonHeader, IonRow, IonTitle } from '@ionic/angular/standalone';
import { ITEMS } from '../database/item_database';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { MenuComponent } from '../components/menu/menu.component';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, CommonModule, FormsModule, IonCard, IonGrid, IonRow, IonCol, ToolbarComponent, MenuComponent]
})
export class ItemPage implements OnInit {

  items = ITEMS;

  constructor(private cardService: CardService) {}

  ngOnInit() {}

  async expandItemCard(index: number) {
    this.cardService.openItemCard(index);
  }
}
