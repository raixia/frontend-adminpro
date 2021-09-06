import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { CargaImagenesService } from './services/carga-imagenes.service';
import { PipesPipe } from './pipes/pipes.pipe';





@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    PipesPipe,
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  providers: [
    CargaImagenesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
