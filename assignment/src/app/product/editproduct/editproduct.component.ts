


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  addProductForm: FormGroup;
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
    this.addProductForm = this.formBuilder.group({
      productName: '',
    })
  }

  getCategory() {
    this.http.get(`${environment.baseUrl}/api/product/getProductById/${this.id}`).subscribe((response: any) => {
      this.categoryData = response.data;
      this.addProductForm.patchValue(this.categoryData)
    },
      error => {
        if (error) {
          this.toastr.error('Something went wrong!');
        }
      }
    )
  }

  addProduct() {
    const obj = {
      productName : this.addProductForm.value.productName,
      productId   : this.id
    }
    this.http.post(`${environment.baseUrl}/api/product/addAndUpdateProduct`, obj).subscribe((response:any)=>{
       this.toastr.success('Product updated successfully!');
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



