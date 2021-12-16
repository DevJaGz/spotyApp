import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAlbum } from 'src/app/interfaces/album.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit {
  @Input() song: IAlbum = {} as IAlbum;

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  lookArtist() {
    // console.log(JSON.stringify(this.song, null, 2))
    const fisrtArtistId = this.song.artists[0].id;
    // console.log(fisrtArtistId);
    this._router.navigate(['home/artist', fisrtArtistId]);
  }

}
