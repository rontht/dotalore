import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
import { ACCOUNTS } from '../database/account_database';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  accounts = ACCOUNTS

  constructor(private storage: Storage) { 
    this.init();
    this.accountReset("accounts");
  }
  
  async init() {
    await this.storage.create();
  }
  
  accountReset(key: string) {
    this.storage.get("accounts").then(val => {
      if (val.length < 2){
        this.storage.set("accounts", this.accounts);
      }
    })
  }

  set(key: string, value: any) {
    this.storage?.set(key, value);
  }

  async get(key: string) {
    return await this.storage?.get(key);
  }
}
