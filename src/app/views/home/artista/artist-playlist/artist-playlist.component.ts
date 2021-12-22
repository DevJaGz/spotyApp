import { Component, Input, OnInit } from '@angular/core';
import { ITrack } from 'src/app/interfaces/top-track.interface';

@Component({
  selector: 'app-artist-playlist',
  templateUrl: './artist-playlist.component.html',
  styleUrls: ['./artist-playlist.component.scss']
})
export class ArtistPlaylistComponent implements OnInit {
  @Input() tracks: ITrack[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
