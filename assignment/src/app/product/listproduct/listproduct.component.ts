

import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {
  
  productData;
  page = '1'
  pager = {}

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProductData()
  }

  getProductData() {
    let params = new HttpParams();
    params = params.append('page', this.page);
    this.http.get(`${environment.baseUrl}/api/product/getProducts`, { params: params}).subscribe((res: any) => {
      if(res) {
        this.productData = res.data.value;
      }
    })
  }

  delete(id) {
    const obj = {
      isDeleted: true,
      productId: id
    }
    this.http.post(`${environment.baseUrl}/api/product/deleteProduct`, obj).subscribe((data: any) => {
      if(data) {
        this.toastr.success('Product deleted!');
        this.getProductData();
      }
    })
  }

}

