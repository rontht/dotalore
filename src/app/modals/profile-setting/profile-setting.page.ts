import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonAlert, IonAvatar, IonButton, IonButtons, IonCol, IonContent, IonDatetime, IonDatetimeButton, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonRow, IonTitle, IonToolbar, ModalController, NavController, NavParams } from '@ionic/angular/standalone';
import { StorageService } from 'src/app/services/storage.service';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.page.html',
  styleUrls: ['./profile-setting.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonButton, IonItem, IonButtons, IonList, IonModal, IonDatetime, IonDatetimeButton, IonGrid, IonCol, IonRow, IonAlert, IonAvatar, IonIcon]
})
export class ProfileSettingPage implements OnInit {
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
  accountIndex: number = 0;
  user:any= {};
  deleteButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Delete',
      role: 'delete',
    },
  ]
  saveButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      role: 'save',
    },
  ]
  imageFile: any;
  newImage = false;
  noProfile = false;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private storage: StorageService,
    public navCtrl: NavController
  ) {
    addIcons({ chevronBackOutline });
    this.user = this.navParams.data;
    this.getStorage("accounts");
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  saveChanges(ev: any) {
    var eventRole = ev.detail.role;
    if (eventRole == 'save') {
      if (this.newImage === true) {
        this.user.profile = this.imageFile;
        this.newImage = false;
      }
      // console.log(this.savedAccounts);
      this.modalCtrl.dismiss({
        username: this.user.username, 
        accPassword: this.user.accPassword, 
        displayName: this.user.displayName,
        dateOfBirth: this.user.dateOfBirth,
        profile: this.user.profile,
        favourites: this.user.favourites
      });
    }
  }

  deleteAcc(ev: any) {
    var eventRole = ev.detail.role;
    if (eventRole == 'delete') {
      // console.log(this.savedAccounts);
      this.savedAccounts.splice(this.accountIndex, 1);
      this.storage.set("accounts", this.savedAccounts);
      this.storage.accountReset("accounts");
      this.navCtrl.navigateRoot("/home");
      this.modalCtrl.dismiss();
    }
  }
  
  getStorage(key:string) {
    this.storage.get(key).then((data) => {
      // get accounts from storage
      this.savedAccounts = data;
      
      // get index by matching current username with storage username
      if (this.user.username != null || undefined) {
        const index = this.savedAccounts.findIndex(x => x.username === this.user.username);
        this.accountIndex = index;
        if (this.savedAccounts[this.accountIndex].profile == "" || undefined || null) {
          this.noProfile = false;
        } else {
          this.noProfile = true;
        }
      };
    });
  }

  imageSelected(file: any) {
    let fileReader = new FileReader();
    fileReader.onload = e => {
      this.imageFile = fileReader.result;
      this.newImage = true;
    };
    fileReader.readAsDataURL(file[0]);
  }
}
