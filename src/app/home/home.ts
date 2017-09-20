import { AddCandidatePage } from './../add-candidate/add-candidate';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//Handles http services
import { Http } from '@angular/http';
import 'rxjs';
import 'rxjs/add/operator/map';
//Imports our candidate provider.
import { Candidate } from './../../providers/candidate';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  //To store all candidates in API response.
  candidates: Candidate[] = [];

  //Here we store candidates as divided by group
  tCandidates: Candidate[] = [];
  mCandidates: Candidate[] = [];
  bCandidates: Candidate[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {}

  ionViewDidLoad() {
    //Retrieves candidates and stores into an array. TODO: change call only if not called recently.
    //TODO: Save to file call from file when offline.
    this.getCandidates().then(candidates => { this.candidates = candidates; this.sortCandidates(this.candidates) });
  }

  //Http data handling.

  getCandidates(): Promise<Candidate[]> {
    const url = `http://candidaterankapi.azurewebsites.net/api/Candidates`;

    return this.http.get(url)
      .retry(2)
      .map(x => {
        var result: Candidate[] = x.json();
        return result;
      })
      .toPromise();
  }

  sortCandidates(allCandidates: Candidate[]) {
    //First we use typescripts sort function to order candidates by aggregate score.
    allCandidates.sort((a, b) => {
      if(this.getScore(a) == this.getScore(b))
        return 0;
      else{
        if(this.getScore(a) > this.getScore(b))
        return 1
      else if(this.getScore(a) < this.getScore(b))
        return -1
      }
    })

    //then we decide how many candidates to put in each tier. I made it so that when uneven,
    //the middle group will be largest.
    let mGroupSize = Math.ceil(allCandidates.length / 3);
    let bGroupSize = Math.floor(allCandidates.length / 3);

    //I'll just run some do-while loops to populate the tiers.
    let i = 0;
    for(; i < bGroupSize; i++)
    {
      this.bCandidates.push(allCandidates[i]);
    }
    for(; i < bGroupSize + mGroupSize; i++)
    {
      this.mCandidates.push(allCandidates[i]);
    }
    for(; i < allCandidates.length; i++)
    {
      this.tCandidates.push(allCandidates[i]);
    }
    
  }


  getScore(candidate: Candidate) {
    let score = candidate.Personal + candidate.Tech;
    if(candidate.Degree) {
      score += 5;
    }
    if(candidate.English) {
      score += 5;
    }

    return score;
  }

  //Navigation.

  gotoAddCandidate() {
    this.navCtrl.push(AddCandidatePage, {}, { animate: true, direction: 'forward'});
  }

  gotoEdit(candidate: Candidate) {
    this.navCtrl.push(AddCandidatePage, {editCan: candidate}, { animate: true, direction: 'forward'})
  }
}

