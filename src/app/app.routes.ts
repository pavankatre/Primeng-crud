import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserGraphComponent } from './components/user-graph/user-graph.component';

export const routes: Routes = [
    {path :'home', component : UserListComponent , pathMatch:'full'},
    {path: '', redirectTo:'home' ,pathMatch :'full' },
    {path: 'updateuser/:id', component :UserFormComponent , pathMatch: 'full'},
    {path: 'adduser' , component : UserFormComponent , pathMatch:'full'},
    {path: 'graph', component :  UserGraphComponent , pathMatch :'full'}

];
