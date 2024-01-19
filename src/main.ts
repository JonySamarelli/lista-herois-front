import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

appConfig.providers = [
  ...appConfig.providers,
  importProvidersFrom(BrowserAnimationsModule),
  importProvidersFrom(HttpClientModule),
  importProvidersFrom(FormsModule),
  importProvidersFrom(ToastrModule.forRoot({
    timeOut: 3000,
    positionClass: 'toast-bottom-center',
    preventDuplicates: true,
  }))
];

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
