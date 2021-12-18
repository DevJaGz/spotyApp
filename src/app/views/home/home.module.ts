import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { UserModule } from '../user/user.module';
import { MainComponent } from './main/main.component';
import { SpotifyService } from '../../services/spotify.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';

import { CardComponent } from './card/card.component';
import { LimitStringPipe } from './pipes/limit-string.pipe';
import { ArtistaComponent } from './artista/artista.component';
import { NoImagePipe } from './pipes/no-image.pipe';
import { InfoCardArtistComponent } from './artista/info-card-artist/info-card-artist.component';
import { ArtistPlaylistComponent } from './artista/artist-playlist/artist-playlist.component';

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    CardComponent,
    LimitStringPipe,
    NoImagePipe,
    ArtistaComponent,
    InfoCardArtistComponent,
    ArtistPlaylistComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    UserModule,
    HttpClientModule
  ],
  providers: [
    SpotifyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class HomeModule { }
