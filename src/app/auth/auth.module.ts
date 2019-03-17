import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth.router.module';
import { IonicModule } from '@ionic/angular';

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
