import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { firstValueFrom, forkJoin, mergeMap, of } from 'rxjs';
import { AlbumDialogComponent } from './components/album-dialog/album-dialog.component';
import { Album } from '../../models/album.model';
import { Photo } from '../../models/photo.model';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrl: './album.component.css',
})
export class AlbumComponent {
  album: Album;
  currentPhotoIndex: number;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private dialog: MatDialog
  ) {
    this.setAlbum(this.router.getCurrentNavigation()?.extras.state?.['album']);
  }

  async setAlbum(album: Album) {
    this.album = album || (await this.getAlbumAndPhotos());
  }

  async getAlbumAndPhotos() {
    const id = this.router.getCurrentNavigation()?.id || 0;

    return await firstValueFrom(
      forkJoin([this.getAlbum(id), this.getPhotos(id)]).pipe(
        mergeMap((res) => {
          return of({ ...res[0], photos: res[1] });
        })
      )
    );
  }

  getAlbum(id: number) {
    return this.httpClient.get<Album>(
      `https://jsonplaceholder.typicode.com/albums/${id}`
    );
  }

  getPhotos(albumId: number) {
    return this.httpClient.get<Photo[]>(
      `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
    );
  }

  openDialog(index: number) {
    this.currentPhotoIndex = index;
    const dialog = this.dialog.open(AlbumDialogComponent, {
      data: this.getDialogData(),
    });
    this.registerSubscriptions(dialog.componentInstance);
  }

  registerSubscriptions(dialog: AlbumDialogComponent) {
    dialog.next.subscribe(() => this.showNextPhoto(dialog));

    dialog.previous.subscribe(() => this.showPreviousPhoto(dialog));

    dialog.selected.subscribe((id: number) =>
      this.showSelectedPhoto(dialog, id)
    );
  }

  showPreviousPhoto(dialog: AlbumDialogComponent) {
    this.currentPhotoIndex--;
    dialog.data = this.getDialogData();
  }

  showNextPhoto(dialog: AlbumDialogComponent) {
    this.currentPhotoIndex++;
    dialog.data = this.getDialogData();
  }

  showSelectedPhoto(dialog: AlbumDialogComponent, id: number) {
    this.currentPhotoIndex =
      this.album.photos?.findIndex((photo: any) => photo.id === id) || 0;
    dialog.data = this.getDialogData();
  }

  getButtonsVisibility() {
    return {
      showPreviousButton: this.currentPhotoIndex > 0,
      showNextButton:
        this.currentPhotoIndex < (this.album?.photos?.length || 0) - 1,
    };
  }

  getThumbnails() {
    const mod = this.currentPhotoIndex % 4;

    return this.album.photos?.slice(
      this.currentPhotoIndex - mod,
      this.currentPhotoIndex - mod + 5
    );
  }

  getDialogData() {
    return {
      current: this.album?.photos?.[this.currentPhotoIndex],
      ...this.getButtonsVisibility(),
      thumbnails: this.getThumbnails(),
    };
  }
}
