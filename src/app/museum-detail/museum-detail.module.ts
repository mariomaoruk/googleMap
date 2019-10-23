import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MuseumDetailPage } from './museum-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MuseumDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MuseumDetailPage]
})
export class MuseumDetailPageModule {}
