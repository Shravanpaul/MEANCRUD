import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { HeaderComponent } from './header/header.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { CreatePatientComponent } from './create-patient/create-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { EditUserComponent } from './edit-user/edit-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddcategoryComponent } from './category/addcategory/addcategory.component';
import { EditcategoryComponent } from './category/editcategory/editcategory.component';
import { ListcategoryComponent } from './category/listcategory/listcategory.component';
import { AddproductComponent } from './product/addproduct/addproduct.component';
import { EditproductComponent } from './product/editproduct/editproduct.component';
import { ViewproductComponent } from './product/viewproduct/viewproduct.component';
import { ListproductComponent } from './product/listproduct/listproduct.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    HeaderComponent,
    PatientViewComponent,
    CreatePatientComponent,
    EditUserComponent,
    AddcategoryComponent,
    EditcategoryComponent,
    ListcategoryComponent,
    AddproductComponent,
    EditproductComponent,
    ViewproductComponent,
    ListproductComponent
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
