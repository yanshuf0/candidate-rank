import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCandidatePage } from './add-candidate';

@NgModule({
  declarations: [
    AddCandidatePage,
  ],
  imports: [
    IonicPageModule.forChild(AddCandidatePage),
  ],
})
export class AddCandidatePageModule {}
