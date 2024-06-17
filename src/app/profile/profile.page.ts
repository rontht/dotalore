import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonTitle, IonToolbar, ModalController, NavController } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ProfileSettingPage } from '../modals/profile-setting/profile-setting.page';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonButton, IonItem, IonList, IonIcon, IonAvatar]
})
export class ProfilePage implements OnInit {

  // Array to get accounts from storage
  savedAccounts = [
    {
      username: "default",
      accPassword: "000",
      displayName: "Default",
      dateOfBirth: "2000-01-01T12:00:00",
      profile: "",
      favourites: "00000000000000000000",
    }
  ];
  noProfile = false;

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    public navCtrl: NavController,
    private storage: StorageService
  ) { 
    addIcons({ chevronBackOutline });
    this.getStorage("accounts");
  }
  
  getStorage(key: string) {
    this.storage.get(key).then((data) => {
      // get accounts from storage
      this.savedAccounts = data;

      // get username from url
      this.routeParamSubscription = this.route.params.subscribe(params => {
        this.username = params['username'];
      });

      // get index by matching url username with storage username
      if (this.username != null || undefined) {
        const index = this.savedAccounts.findIndex(x => x.username === this.username);
          this.accountIndex = index;
          if (this.savedAccounts[this.accountIndex].profile == "" || undefined || null) {
            this.noProfile = false;
          } else {
            this.noProfile = true;
          }
      };

      // rewrite blob of date into readable date
      if (this.accountIndex != -1) {
        const dateArray = this.savedAccounts[this.accountIndex].dateOfBirth.split('-');
        const monthIndex = +dateArray[1];
        this.displayDate = dateArray[1] + ' ' + this.months[monthIndex-1] + ', ' + dateArray[0];
      }
    });
  }

  setStorage(key: string) {
    this.storage.set(key, this.savedAccounts);
  }

  //Receiving Index from previous page
  accountIndex: number = 0;
  username:string | null = null;
  routeParamSubscription:any;
  displayDate: string = "";
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  
  ngOnInit() {}

  ngOnDestroy(){
    this.routeParamSubscription.unsubscribe();
  }
  
  openSetting(index: number) {
    this.modalCtrl.create({
      component: ProfileSettingPage,
      componentProps: this.savedAccounts[index]
    }).then(modal => {
      modal.onDidDismiss().then((retval) => {
        if (retval.data) {
          this.savedAccounts[index] = retval.data
          this.setStorage("accounts");
          if (this.savedAccounts[index].profile == "" || undefined || null) {
            this.noProfile = false;
          } else {
            this.noProfile = true;
          }
        }
      });
      modal.present();
    })
  }

  goBack() {
    this.navCtrl.navigateRoot("/hero/" + this.savedAccounts[this.accountIndex].username);
  }
}
