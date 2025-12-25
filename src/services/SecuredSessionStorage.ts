import { Injectable } from "@angular/core";
import { SecuredStorage } from "./SecuredStorage";


@Injectable({
  providedIn: 'root'
})
export class SecuredSessionStorage extends SecuredStorage {
  
  constructor() {
    super(sessionStorage);
  }
  
}
