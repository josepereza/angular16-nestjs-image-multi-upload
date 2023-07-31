import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './pages/create/create.component';
import { ListadoComponent } from './pages/listado/listado.component';

const routes: Routes = [
{
  path:'', redirectTo:'create', pathMatch:'full'
},
  {
 
  path:'create', component:CreateComponent
},
{
  path:'listado', component:ListadoComponent
}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
