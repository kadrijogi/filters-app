import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { FilterComponent } from './components/filter/filter.component';
import { FilterModalComponent } from './components/filter-modal/filter-modal.component';
import { CriterionComponent } from './components/criterion/criterion.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    FilterModalComponent,
    CriterionComponent,
    FilterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
