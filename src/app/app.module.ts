import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/Auth/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WarehouseListComponent } from './modules/Warehouse/warehouse-list/warehouse-list.component';
import { WarehouseFormComponent } from './modules/Warehouse/warehouse-form/warehouse-form.component';
import { ItemsListComponent } from './modules/Item/items-list/items-list.component';
import { ItemFormComponent } from './modules/Item/item-form/item-form.component';
import { UserListComponent } from './modules/User/user-list/user-list.component';
import {  HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserFormComponent } from './modules/User/user-form/user-form.component';
import { ChangePasswordComponent } from './modules/User/change-password/change-password.component';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { LogViewerComponent } from './modules/logs/log-viewer/log-viewer.component';
import { MainLayoutComponent } from './Core/layout/main-layout.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './modules/Auth/Interceptor/AuthInterceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WarehouseListComponent,
    WarehouseFormComponent,
    ItemsListComponent,
    ItemFormComponent,
    UserListComponent,
    UserFormComponent,
    ChangePasswordComponent,
    DashboardComponent,
    LogViewerComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
