import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth.router.module';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from '../views/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    IonicModule.forRoot()
  ],
  declarations: [
    LoginComponent
  ]
})
export class AuthModule {}
