import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VehicleFormComponent } from './vehicle/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';

@NgModule({
  declarations: [
    AppComponent,
    VehicleFormComponent,
    VehicleListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
