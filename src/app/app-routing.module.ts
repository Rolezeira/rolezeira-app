import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoggedComponent } from './views/logged/logged.component';

const routes: Routes = [
  {
    path: '',
    component: LoggedComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          {
            path: 'tabs',
            loadChildren: './views/tabs/tabs.module#TabsPageModule'
          },
          {
            path: '',
            loadChildren: './views/tabs/tabs.module#TabsPageModule'
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    children: [
      {
        path: '',
        loadChildren: './auth/auth.module#AuthModule'
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
