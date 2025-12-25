import { Injectable } from "@angular/core";
import { SecuredStorage } from "./SecuredStorage";


@Injectable({
  providedIn: 'root'
})
export class SecuredLocalStorage extends SecuredStorage {

  constructor() {
    super(localStorage);
  }
  
}