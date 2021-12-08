import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    LoginComponent,
  ],
  imports: [

    SharedModule,
    RouterModule.forChild([]),

  ],
  exports: [
    NavbarComponent,
  ]
})
export class CoreModule { }
