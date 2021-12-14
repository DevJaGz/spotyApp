import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
  ]
})
export class MainComponent implements OnInit {

  constructor(private _serviceSpotify: SpotifyService) { }

  ngOnInit(): void {
    this.getReleases();
  }

  getReleases() {
    this._serviceSpotify.getNewReleases$().subscribe((data: any) => {
      console.log(data);
    })
  }
}
