import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonAvatar, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonRow, MenuController, NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkSharp, logOutOutline } from 'ionicons/icons';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [IonMenu, IonContent, IonList, IonItem, IonButton, IonGrid, IonRow, IonCol, IonLabel, IonIcon, IonAvatar]
})
export class MenuComponent implements OnInit {
  accountIndex: number = 0;
  username: string | null = null;
  routeParamSubscription: any;
  currentPage: any;
  checked: any = {
    hero: false,
    item: true,
    faction: true,
    favourite: true,
    about: true
  }

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
    private menu: MenuController,
    private route: ActivatedRoute,
    public navCtrl: NavController,
    public router: Router,
    private storage: StorageService
  ) {
    addIcons({ checkmarkSharp, logOutOutline })
    this.getStorage("accounts")
  }

  async ngOnInit() {
    // Detect current page
    const url = this.router.url.split('/');
    this.currentPage = url[1];
    this.checkMark();
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
    });
  }

  ngOnDestroy() {
    this.routeParamSubscription.unsubscribe();
  }

  routingPage(page: string) {
    this.menu.close();
    this.navCtrl.navigateBack(page + this.savedAccounts[this.accountIndex].username);
  }

  checkMark() {
    // Show checkmark based on current page
    if (this.currentPage == 'hero') {
      this.checked.hero = false,
        this.checked.item = true,
        this.checked.map = true,
        this.checked.faction = true,
        this.checked.favourite = true,
        this.checked.about = true
    } else if (this.currentPage == 'item') {
      this.checked.hero = true,
        this.checked.item = false,
        this.checked.map = true,
        this.checked.faction = true,
        this.checked.favourite = true,
        this.checked.about = true
    } else if (this.currentPage == 'map') {
      this.checked.hero = true,
        this.checked.item = true,
        this.checked.map = false,
        this.checked.faction = true,
        this.checked.favourite = true,
        this.checked.about = true
    } else if (this.currentPage == 'faction') {
      this.checked.hero = true,
        this.checked.item = true,
        this.checked.map = true,
        this.checked.faction = false,
        this.checked.favourite = true,
        this.checked.about = true
    } else if (this.currentPage == 'favourite') {
      this.checked.hero = true,
        this.checked.item = true,
        this.checked.map = true,
        this.checked.faction = true,
        this.checked.favourite = false,
        this.checked.about = true
    } else if (this.currentPage == 'about') {
      this.checked.hero = true,
        this.checked.item = true,
        this.checked.map = true,
        this.checked.faction = true,
        this.checked.favourite = true,
        this.checked.about = false
    }
  }
}
