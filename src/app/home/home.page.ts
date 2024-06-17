import { Component } from '@angular/core';
import { IonHeader, IonContent, NavController, IonItem, IonTitle, IonLabel, IonButton, IonCheckbox, IonModal, IonDatetimeButton, IonList, IonButtons, IonDatetime, IonInput, AlertController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, CommonModule, FormsModule, IonList, IonItem, IonInput, IonCheckbox, IonLabel, IonButton, IonDatetime, IonDatetimeButton, IonModal, IonButtons]
})
export class HomePage {
  logInAccount: any = [];
  signUpAccount = [
    {
      username: "",
      accPassword: "",
      displayName: "",
      dateOfBirth: "2000-01-01T12:00:00",
      profile: "",
      favourites: "00000000000000000000"
    }
  ];

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

  constructor(
    private navCtrl: NavController,
    private storage: StorageService,
    private alertCtrl: AlertController
  ) {
    this.getStorage("accounts");
  }

  setStorage(key: string) {
    this.storage.set(key, this.savedAccounts);
  }

  getStorage(key: string) {
    this.storage.get(key).then((data) => {
      this.savedAccounts = data
    });
  }


  // Switch between sign-in and sign-up pages
  signIn: boolean = false;
  signUp: boolean = true;
  devMode: boolean = false;
  openSignUp() {
    this.signIn = true;
    this.signUp = false;
  }

  openLogin() {
    this.signIn = false;
    this.signUp = true;
  }

  logIn() {
    if (this.logInAccount.username != null || undefined) {
      // Check username exist in database
      const index = this.savedAccounts.findIndex(x => x.username === this.logInAccount.username)
      if (index != -1) {
        // Skip password for development
        // this.loggingIn(this.logInAccount.username);
        
        // Check password matched with username
        if (this.savedAccounts[index].accPassword === this.logInAccount.accPassword) {
          this.loggingIn(this.logInAccount.username);
        } else {
          this.presentAlert("Username or Password doesn't match.");
          // alert("Username or Password doesn't match.");
        }
      } else {
        this.presentAlert("Username or Password doesn't match.")
        // alert("Username or Password doesn't match.");
      }
    } else {
      this.presentAlert("Please enter username.");
     // alert("Please enter username...");
    }

    // Skip typing, Easier log-in for development
    // this.loggingIn('thwin');
  }

  async loggingIn(username: string) {
    this.navCtrl.navigateForward('/hero/' + username);
  }

  // Creating a new Account
  agreedTerms: boolean = false;

  createAcc() {
    if (this.agreedTerms == true) {
      // Check if any of the required fields are empty
      if (
        this.signUpAccount[0].username &&
        this.signUpAccount[0].accPassword &&
        this.signUpAccount[0].displayName &&
        this.signUpAccount[0].dateOfBirth
      ) {
        const index = this.savedAccounts.findIndex(x => x.username === this.signUpAccount[0].username)
        // Check if Username already exist or not
        if (index == -1) {
          this.savedAccounts.push(this.signUpAccount[0]);
          this.setStorage("accounts");
          this.loggingIn(this.signUpAccount[0].username);
        } else {
          // alert("Username already exist, choose a new one!");
          this.presentAlert("Username already exist, choose a new one!");
        }
      } else {
        // alert("Please enter all the necessary details");
        this.presentAlert("Please enter all the necessary details.");
      }
    } else {
      this.presentAlert("Please agree to our terms and conditions. ")
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: "Notice!",
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
