import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BlockUIService } from 'ng-block-ui';
import { IArtist } from 'src/app/interfaces/artist.interface';
import { ITopTrack } from 'src/app/interfaces/top-track.interface';
import { AlertService } from 'src/app/services/alert.service';
import { SpotifyService } from '../../../services/spotify.service';

@UntilDestroy()
@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent implements OnInit {

  artist: IArtist = {} as IArtist;
  topTraks: ITopTrack[] = []


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _blockUIService: BlockUIService,
    private _alertService: AlertService,
    private _spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(untilDestroyed(this))
      .subscribe({
        next: ({ id }) => {
          // console.log(id);
          this.getArtist(id)
          this.getTopTracks(id)
        }
      })
  }


  getArtist(id: string) {
    this._blockUIService.start("blockRef", "Consultando...")
    this._spotifyService.getArtist$(id).subscribe({
      next: (res) => {
        this._blockUIService.stop("blockRef")
        this.artist = res;
        console.log(res);

        // console.log(JSON.stringify(res, null, 2));
      },
      error: ({ error }: HttpErrorResponse) => {
        this._blockUIService.stop("blockRef")
        this._alertService.error("SpotyApp", `El siguiente problema se presento al solicitar el <b>artista</b>: <br><br> ${error.error.status} - ${error.error.message} <br><br> <b>Por favor comuníquese con el administrador</b>`)
      }
    })
  }

  getTopTracks(id: string) {
    this._blockUIService.start("blockRef", "Consultando...")
    this._spotifyService.getTopTracks$(id).subscribe({
      next: (res) => {
        this._blockUIService.stop("blockRef")
        this.topTraks = res;
        console.log(res);
        // console.log(JSON.stringify(res, null, 2));
      },
      error: ({ error }: HttpErrorResponse) => {
        this._blockUIService.stop("blockRef")
        this._alertService.error("SpotyApp", `El siguiente problema se presento al solicitar los <b>top tracks</b>: <br><br> ${error.error.status} - ${error.error.message} <br><br> <b>Por favor comuníquese con el administrador</b>`)
      }
    })
  }
}
