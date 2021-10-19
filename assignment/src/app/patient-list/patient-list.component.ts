import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  
  userData;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.http.get(`${environment.baseUrl}/api/patient/`).subscribe((res: any) => {
      if(res) {
        this.userData = res.data;
      }
    })
  }

  delete(id) {
    this.http.delete(`${environment.baseUrl}/api/patient/${id}`).subscribe((data: any) => {
      if(data) {
        this.toastr.success('User deleted!');
        this.getUserData();
      }
    })
  }

}
