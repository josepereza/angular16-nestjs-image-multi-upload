import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './pages/create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ListadoComponent } from './pages/listado/listado.component';


@NgModule({
  declarations: [AppComponent, CreateComponent, ListadoComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
