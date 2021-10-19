

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  addCategoryForm: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
  
   }

  ngOnInit() {
    this.addCategoryForm = this.formBuilder.group({
      categoryName: '',
    })
  }

  addCategory() {
    const obj = {
      categoryName : this.addCategoryForm.value.categoryName
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
