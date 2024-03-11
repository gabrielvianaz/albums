import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Album } from '../../../../models/album.model';
import { Photo } from '../../../../models/photo.model';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css',
})
export class AlbumsComponent {
  albums: Array<Album>;
  photos: Array<Photo>;

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getAlbumsAndPhotos();
  }

  getAlbumsAndPhotos() {
    forkJoin([this.getAlbums(), this.getPhotos()]).subscribe((res) => {
      this.albums = res[0];
      this.photos = res[1];
    });
  }

  getAlbums() {
    return this.httpClient.get<Album[]>(
      'https://jsonplaceholder.typicode.com/albums'
    );
  }

  getPhotos() {
    return this.httpClient.get<Photo[]>(
      'https://jsonplaceholder.typicode.com/photos'
    );
  }

  getThumbnail(albumId: number) {
    return this.photos.find((photo) => photo.albumId === albumId)?.url || '';
  }

  navigate(albumId: number) {
    this.router.navigate([`/albums/${albumId}`], {
      state: {
        album: {
          ...this.albums.find((album) => album.id === albumId),
          photos: this.photos.filter((photo) => photo.albumId === albumId),
        },
      },
    });
  }
}
