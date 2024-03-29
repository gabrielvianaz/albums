import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumComponent } from './components/album/album.component';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [HomeComponent, AlbumsComponent, AlbumComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class HomeModule {}
