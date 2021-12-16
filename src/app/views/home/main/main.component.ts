import { Component, OnInit } from '@angular/core';
import { BlockUIService } from 'ng-block-ui';
import { AlertService } from 'src/app/services/alert.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { IAlbum } from '../../../interfaces/album.interface';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
  ]
})
export class MainComponent implements OnInit {

  newSongs: IAlbum[] = []

  constructor(
    private _spotifyService: SpotifyService,
    private _blockUIService: BlockUIService,
    private _alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getAlbumReleases();
  }

  getAlbumReleases() {
    this._blockUIService.start('blockRef', 'Consultando...')
    this._spotifyService.getAlbumReleases$(20).subscribe({
      next: (data: IAlbum[]) => {
        this._blockUIService.stop('blockRef')
        this.newSongs = data;
        // console.log(data);

      },
      error: ({ error }: HttpErrorResponse) => {
        this._blockUIService.stop('blockRef')
        this._alertService.error("SpotyApp", `El siguiente problema se presento al solicitar los <b>releases</b>: <br><br> ${error.error.status} - ${error.error.message} <br><br> <b>Por favor comuníquese con el administrador</b>`)
        // console.log(error);
      },
      complete: () => { }
    })
  }
}
