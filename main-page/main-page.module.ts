import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material.module';

const routing = RouterModule.forChild([
  {path: '', component: MainPageComponent}
]);

@NgModule({
  imports: [
    routing,
    MaterialModule
  ],
  declarations: [MainPageComponent]
})
export class MainPageModule { }
