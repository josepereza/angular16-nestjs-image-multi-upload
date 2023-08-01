import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './pages/create/create.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { UpdateComponent } from './pages/update/update.component';

const routes: Routes = [
{
  path:'', redirectTo:'create', pathMatch:'full'
},
  {
 
  path:'create', component:CreateComponent
},
{
  path:'listado', component:ListadoComponent
},
{
  path:'update/:id', component:UpdateComponent
}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
