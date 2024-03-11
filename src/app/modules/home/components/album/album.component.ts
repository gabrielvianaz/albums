import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Album } from '../../../../models/album.model';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrl: './album.component.css',
})
export class AlbumComponent {
  @Input() album: Album;
  @Input() thumbnail: string;
  @Output() navigate: EventEmitter<any> = new EventEmitter();
}
