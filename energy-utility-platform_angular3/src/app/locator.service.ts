import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocatorService {
  //localhost:8080 10.132.88.37:8080
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
