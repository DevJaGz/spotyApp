import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: "home", loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule) },
  { path: "user", loadChildren: () => import('./views/user/user.module').then(m => m.UserModule) },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
