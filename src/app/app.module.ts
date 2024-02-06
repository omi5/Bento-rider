import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawerComponent } from './drawer/drawer.component';

//For Drawer
// import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MapComponent } from './map/map.component';

//for icon
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RiderHistoryComponent } from './rider-history/rider-history.component';
import { OrderNotificationComponent } from './order-notification/order-notification.component';

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    DrawerComponent,
    SignInComponent,
    SignUpComponent,
    MapComponent,
    RiderHistoryComponent,
    OrderNotificationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzDrawerModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzIconModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
