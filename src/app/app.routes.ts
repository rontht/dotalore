import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'hero/:username',
    loadComponent: () => import('./hero/hero.page').then( m => m.HeroPage)
  },
  {
    path: 'expanded-hero',
    loadComponent: () => import('./modals/expanded-hero/expanded-hero.page').then( m => m.ExpandedHeroPage)
  },
  {
    path: 'item/:username',
    loadComponent: () => import('./item/item.page').then( m => m.ItemPage)
  },
  {
    path: 'expanded-item',
    loadComponent: () => import('./modals/expanded-item/expanded-item.page').then( m => m.ExpandedItemPage)
  },
  {
    path: 'profile/:username',
    loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'profile-setting',
    loadComponent: () => import('./modals/profile-setting/profile-setting.page').then( m => m.ProfileSettingPage)
  },
  {
    path: 'faction/:username',
    loadComponent: () => import('./faction/faction.page').then( m => m.FactionPage)
  },
  {
    path: 'favourite/:username',
    loadComponent: () => import('./favourite/favourite.page').then( m => m.FavouritePage)
  },
  {
    path: 'about/:username',
    loadComponent: () => import('./about/about.page').then( m => m.AboutPage)
  },
  {
    path: 'map/:username',
    loadComponent: () => import('./map/map.page').then( m => m.MapPage)
  },
];
