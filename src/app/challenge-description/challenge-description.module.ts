import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChallengeDescriptionPageRoutingModule } from './challenge-description-routing.module';

import { ChallengeDescriptionPage } from './challenge-description.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChallengeDescriptionPageRoutingModule
  ],
  declarations: [ChallengeDescriptionPage]
})
export class ChallengeDescriptionPageModule {}
