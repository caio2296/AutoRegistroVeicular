import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './Interceptor/Interceptor';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
      provideHttpClient(withFetch()),
      provideHttpClient(
      withInterceptors([Interceptor]))]
};
