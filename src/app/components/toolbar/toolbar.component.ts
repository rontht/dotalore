import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonButtons, IonMenuButton, IonTitle, IonToolbar, MenuController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [IonTitle, IonButtons, IonMenuButton, IonToolbar]
})
export class ToolbarComponent  implements OnInit {

  currentPage:any;

  constructor(
    private menu: MenuController,
    public router: Router
  ) { }

  ngOnInit() {
    // Detect current page
    const url = this.router.url.split('/');
    this.currentPage = url[1];

    // Change page title based on current page
    if (this.currentPage == "hero"){
      this.currentPage = "HEROES";
    } else if (this.currentPage == "item"){
      this.currentPage = "ITEMS";
    } else if (this.currentPage == "faction"){
      this.currentPage = "FACTIONS";
    } else if (this.currentPage == "map"){
      this.currentPage = "INTERNATIONAL";
    } else if (this.currentPage == "favourite"){
      this.currentPage = "FAVOURITES";
    } else if (this.currentPage == "about"){
      this.currentPage = "ABOUT";
    }
  }

  openMenu(menu:string){
    this.menu.open(menu);
  }
}
