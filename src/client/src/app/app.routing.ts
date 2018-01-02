import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { LoginComponent } from 'app/login.component';
import { ProfileComponent } from 'app/profile.component';
import { AuthGuard } from 'app/auth.guard';
import { MainComponent } from 'app/main.component';

const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile/:uid', component: ProfileComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: 'main' }
];

export const Routing = RouterModule.forRoot(routes);
