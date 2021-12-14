import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [

  {
    path: '', component: HomeComponent, children: [
      { path: "main", component: MainComponent },
      { path: "**", redirectTo: '', pathMatch: 'full' }
    ]
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
