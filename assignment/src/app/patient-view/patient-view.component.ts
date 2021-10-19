import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})
export class PatientViewComponent implements OnInit {

  id;
  profileData;
  profileImage;

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
        }
      );
      this.getProfile();
  }

  getProfile() {
    this.http.get(`${environment.baseUrl}/api/patient/${this.id}`).subscribe((response: any) => {
      this.profileData = response.data;
      this.profileImage = environment.baseUrl + response.data.userProfile;
    },
      error => {
        if (error) {
          this.toastr.error('Something went wrong!');
        }
      }
    )
  }


}
