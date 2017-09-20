import { Candidate } from './../../providers/candidate';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

/**
 * Generated class for the AddCandidatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-candidate',
  templateUrl: 'add-candidate.html',
})
export class AddCandidatePage {
  //form variables
  cName: string;
  speaksEnglish: boolean = false;
  hasDegree: boolean = false;
  pRating: number;
  tRating: number;
  itCandidate: Candidate;

  //for the purpose of editing
  edit: boolean = false;
  eCandidate: Candidate;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl : AlertController, private http:Http) {
  }

  ionViewDidLoad() {
    if(this.navParams.get('editCan')) {
      this.eCandidate = this.navParams.get('editCan');
      this.edit = true;
      this.cName = this.eCandidate.Name;
      this.speaksEnglish = this.eCandidate.English
      this.hasDegree = this.eCandidate.Degree;
      this.pRating = this.eCandidate.Personal;
      this.tRating = this. eCandidate.Tech;
    }
  }

  //async to wait for post before returning to homepage
  async submitForm() {
    //basic input validation
    if(!this.cName) {
      let alert = this.alertCtrl.create({
        title: 'No name!',
        subTitle: 'Please enter a name!',
        buttons: ['OK']
      });
      alert.present();
      //return to avoid multiple alerts
      return false;
    }

    if(this.pRating > 10 || this.pRating < 1) {
      let alert = this.alertCtrl.create({
        title: 'Invalid personality rating!',
        subTitle: 'Please enter a number between 1-10!',
        buttons: ['OK']
      });
      alert.present();
      //return to avoid multiple alerts
      return false;
    }

    if(this.tRating > 10 || this.tRating < 1) {
      let alert = this.alertCtrl.create({
        title: 'Invalid tech rating!',
        subTitle: 'Please enter a number between 1-10!',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }

    //Here we add a new Candidate.
    if(!this.edit){
    this.itCandidate = new Candidate(0, this.cName, this.speaksEnglish, this.hasDegree, this.pRating, this.tRating);
    await this.addCandidate(this.itCandidate);
    this.gotoBack();
    }
    else {
      this.itCandidate = new Candidate(this.eCandidate.Id, this.cName, this.speaksEnglish, this.hasDegree, this.pRating, this.tRating);
      await this.editCandidate(this.itCandidate, this.eCandidate.Id);
      this.gotoBack();
    }
  }

  //Adds a candidate.
  addCandidate(candidate: Candidate): Promise<Candidate> {
    let url = `http://candidaterankapi.azurewebsites.net/api/Candidates`;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, candidate, options).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  //Edits a candidate.
  editCandidate(candidate: Candidate, id: number) : Promise<Candidate> {
    let url = `http://candidaterankapi.azurewebsites.net/api/Candidates/` + id;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(url, candidate, options).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  deleteClicked() {
    this.deleteCandidate();
    this.gotoBack();
  }

  //Deltes a candidate.
  deleteCandidate() : Promise<Candidate>{
    let id = this.eCandidate.Id;
    let url = `http://candidaterankapi.azurewebsites.net/api/Candidates/` + id;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(url, options).toPromise()
    .then(this.extractData)
    .catch(this.handleErrorPromise);
  }

  //Handle response and error data.
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

  //Navigation.

  gotoBack() {
    this.navCtrl.setRoot(HomePage);
    this.edit = false;
  }

}
