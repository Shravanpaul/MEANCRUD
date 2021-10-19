

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {

  addCategoryForm: FormGroup;
  selectedFile: File;
  categoryData
  profileImage
  id;

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
  
   }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
        }
      );
    this.getCategory();
    this.addCategoryForm = this.formBuilder.group({
      categoryName: '',
    })
  }

  getCategory() {
    this.http.get(`${environment.baseUrl}/api/category/getCategoryById/${this.id}`).subscribe((response: any) => {
      this.categoryData = response.data;
      this.addCategoryForm.patchValue(this.categoryData)
    },
      error => {
        if (error) {
          this.toastr.error('Something went wrong!');
        }
      }
    )
  }

  addCategory() {
    const obj = {
      categoryName : this.addCategoryForm.value.categoryName,
      categoryId   : this.id
    }
    this.http.post(`${environment.baseUrl}/api/category/addAndUpdateCategory`, obj).subscribe((response:any)=>{
       this.toastr.success('category added successfully!');
      setTimeout(() => {
        this.router.navigate(['/category-list']);
      }, 1000);
    },
     error=>{
       if(error) {
         this.toastr.info('Something went wrong!');
       }
     }
    )
  }

}


