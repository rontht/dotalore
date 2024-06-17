import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonLabel, IonTitle, IonToolbar, ModalController, NavParams } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-expanded-item',
  templateUrl: './expanded-item.page.html',
  styleUrls: ['./expanded-item.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonAvatar, IonLabel, IonIcon, IonButton]
})
export class ExpandedItemPage implements OnInit {

  item:any = {};
  splittedBonuses:any;
  hideBonus:boolean = false;
  hideDescription:boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {
    addIcons({ chevronBackOutline })
    this.item = this.navParams.data;
    this.splittedBonuses = this.item.bonus.split(',');

    if(this.item.bonus == "") {
      this.hideBonus = true;
    } else {
      this.hideBonus = false;
    }
    
    if(this.item.description == "") {
      this.hideDescription = true;
    } else {
      this.hideDescription = false;
    }
  }

  ngOnInit() {
  }

  closePopUp() {
    this.modalCtrl.dismiss();
  }
}
