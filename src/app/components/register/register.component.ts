import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup!: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  hide = true;
  user : any;
  isAdded : boolean=false;
  confString: string="You have been succesfully registered!";
  
  
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private http: HttpClient,
              private userDetails: AuthenticationService) {
               }

  ngOnInit() {
    this.createForm();


  }

  createForm() {
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'name': [null, Validators.required],
      'password': [null, [Validators.required, this.checkPassword]],
    });
  }


  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  checkPassword(control: { value: any; }) {
    const enteredPassword = control.value
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  
  getErrorEmail() {
    return this.formGroup.get('email')?.hasError('required') ? 'Field is required' :
      this.formGroup.get('email')?.hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email')?.hasError('uniqueEmail') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password')?.hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password')?.hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }
  addUser(post: { email: any; name: any; password: any; }){
    this.post={
    'email': post.email,
    'name': post.name,
    'password':post.password,
    'role': "User" }
    this.http.post('http://localhost:3000/users',this.post).subscribe((res: any)=>{
      this.isAdded=true;})
    
  }

  onSubmit(post: any) {
    this.addUser(post);
    
  }

}
