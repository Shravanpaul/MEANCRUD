import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddcategoryComponent } from './category/addcategory/addcategory.component';
import { EditcategoryComponent } from './category/editcategory/editcategory.component';
import { ListcategoryComponent } from './category/listcategory/listcategory.component';
import { AddproductComponent } from './product/addproduct/addproduct.component';
import { ListproductComponent } from './product/listproduct/listproduct.component';



const routes: Routes = [
  {
    path: '',
    component: ListcategoryComponent
  },
  {
    path: 'category-list',
    component: ListcategoryComponent
  },
  {
    path: 'category-list',
    component: ListcategoryComponent
  },
  {
    path: 'create-new',
    component: AddcategoryComponent
  },
  {
    path: 'edit',
    component: EditcategoryComponent
  },
  {
    path: 'edit/:id',
    component: EditcategoryComponent
  },
  {
    path: 'create-new-product',
    component: AddproductComponent
  },
  {
    path: 'product-list',
    component: ListproductComponent
  },
  {
    path: 'edit-product',
    component: EditcategoryComponent
  },
  {
    path: 'edit-product/:id',
    component: EditcategoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
