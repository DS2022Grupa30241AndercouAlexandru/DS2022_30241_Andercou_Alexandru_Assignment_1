import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocatorService {
  private host="http://localhost:8080"
  public getHost()
  {
    return this.host;
  }
  public setHost()
  {


  }
  constructor() { }
}
