import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [

  {
    path: "home",
    canActivate: [AuthGuard],
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
  },
  { path: "user", loadChildren: () => import('./views/user/user.module').then(m => m.UserModule) },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
