import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawerComponent } from './drawer/drawer.component';
import { MapComponent } from './map/map.component';
import { TestmapComponent } from './testmap/testmap.component';
import { MapComponent1 } from './mapbox/map.component';
import { AnimationComponent } from './animation/animation.component';

const routes: Routes = [
  {path: '', component: DrawerComponent},
  {path:'map', component: MapComponent},
  {path: 'testmap', component: MapComponent1},
  {path: 'animation', component: AnimationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
