import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonTitle } from '@ionic/angular/standalone';
import { MenuComponent } from '../components/menu/menu.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, CommonModule, FormsModule, MenuComponent, ToolbarComponent, IonLabel, IonItem, IonList]
})
export class AboutPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
