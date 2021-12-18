import { Component, Input, OnInit } from '@angular/core';
import { IArtist } from 'src/app/interfaces/artist.interface';
import { SerpApiService } from 'src/app/services/serp-api.service';

@Component({
  selector: 'app-info-card-artist',
  templateUrl: './info-card-artist.component.html',
  styleUrls: ['./info-card-artist.component.scss']
})
export class InfoCardArtistComponent implements OnInit {
  @Input() artist: IArtist = {} as IArtist;

  constructor(private _serApi: SerpApiService) { }

  ngOnInit(): void {
    // this._serApi.getImage$(this.artist.name).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   }
    // })
  }

}
