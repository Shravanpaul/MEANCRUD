
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  addUserForm: FormGroup;
  selectedFile: File;
  profileData
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
    this.getProfile();
    this.addUserForm = this.formBuilder.group({
      first_name: '',
      last_name: '',
      mobile: '',
      email: '',
      myProfile: ''
    })
  }

  getProfile() {
    this.http.get(`${environment.baseUrl}/api/patient/${this.id}`).subscribe((response: any) => {
      this.profileData = response.data;
      this.profileImage = environment.baseUrl + response.data.profileImage;
      this.addUserForm.patchValue(this.profileData)
    },
      error => {
        if (error) {
          this.toastr.error('Something went wrong!');
        }
      }
    )
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }
  editProfile() {
    const uploadData = new FormData();
    uploadData.append('userProfile', this.selectedFile ? this.selectedFile: undefined);
    uploadData.append('first_name', this.addUserForm.value.first_name ? this.addUserForm.value.first_name : undefined );
    uploadData.append('last_name', this.addUserForm.value.last_name ? this.addUserForm.value.last_name : undefined );
    uploadData.append('mobile', this.addUserForm.value.mobile ? this.addUserForm.value.mobile: undefined);
    uploadData.append('email', this.addUserForm.value.email ? this.addUserForm.value.email: undefined);
    this.http.post(`${environment.baseUrl}/api/patient/update/${this.id}`, uploadData).subscribe((response:any)=>{
       this.toastr.success('profile updated successfully!');
      localStorage.setItem('adminData', JSON.stringify(response.data));
      setTimeout(() => {
        this.router.navigate(['/patient-list']);
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

