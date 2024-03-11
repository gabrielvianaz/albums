import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AlbumDialogComponent } from './components/album-dialog/album-dialog.component';

const routes: Routes = [
  {
    path: ':id',
    component: AlbumComponent,
  },
];

@NgModule({
  declarations: [AlbumComponent, AlbumDialogComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class AlbumModule {}
