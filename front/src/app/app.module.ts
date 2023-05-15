import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeModule } from './home/home.module';
import { FooterComponent } from './footer/footer.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, FilterPipe],
  imports: [BrowserModule, AppRoutingModule, HomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
