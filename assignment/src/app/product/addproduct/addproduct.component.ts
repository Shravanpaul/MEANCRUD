

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  addProductForm: FormGroup;
  categoryList
  categorySelected

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
  
   }

  ngOnInit() {
    this.getCategoryData()
    this.addProductForm = this.formBuilder.group({
      productName: '',
    })
  }

  getCategoryData() {
    this.http.get(`${environment.baseUrl}/api/category/getCategory`).subscribe((res: any) => {
      if(res) {
        this.categoryList = res.data;
      }
    })
  }

  addProduct() {
    console.log('test', this.categorySelected)
    const obj = {
      productName : this.addProductForm.value.productName,
      categoryId: this.categorySelected
    }
    this.http.post(`${environment.baseUrl}/api/product/addAndUpdateProduct`, obj).subscribe((response:any)=>{
       this.toastr.success('Product added successfully!');
      setTimeout(() => {
        this.router.navigate(['/product-list']);
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

