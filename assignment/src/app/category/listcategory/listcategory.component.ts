

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrls: ['./listcategory.component.css']
})
export class ListcategoryComponent implements OnInit {
  
  categoryData;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCategoryData();
  }

  getCategoryData() {
    this.http.get(`${environment.baseUrl}/api/category/getCategory`).subscribe((res: any) => {
      if(res) {
        this.categoryData = res.data;
      }
    })
  }

  delete(id) {
    const obj = {
      isDeleted: true,
      categoryId: id
    }
    this.http.post(`${environment.baseUrl}/api/category/deleteCategory`, obj).subscribe((data: any) => {
      if(data) {
        this.toastr.success('category deleted!');
        this.getCategoryData();
      }
    })
  }

}

