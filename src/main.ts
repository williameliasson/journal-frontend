import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { registerLocaleData } from '@angular/common';
import localeSv from '@angular/common/locales/sv';

registerLocaleData(localeSv, 'sv-SE');
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
