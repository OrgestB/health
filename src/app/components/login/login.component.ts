import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;
  titleAlert: string = 'This field is required';
  matchAlert: string = 'Email or Password not correct! '
  post: any = '';
  user: any[] = [];
  loggedIn: string = 'false';
  UserData : any;
  returnUrl: string | undefined;
  error = '';
  loading = false;
  submitted = false;
  noMatch: boolean =false;
  match : boolean =false;
  hide = true;
  

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route : ActivatedRoute,
    private service : BackendService,
    private authenticationService : AuthenticationService ) {
    //   if (this.authenticationService.currentUserValue) { 
    //     this.router.navigate(['/']);
    // }
     }

  ngOnInit() {

    this.createForm();
     // get return url from route parameters or default to '/'
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  createForm() {
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'password': [null, [Validators.required, this.checkPassword]],
      'validate': ''
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
        this.formGroup.get('email')?.hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }
  getErrorPassword() {
    return this.formGroup.get('password')?.hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password')?.hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }
  onSubmit(post: any) {
    this.post = post;
    this.submitted = true;

      this.loading = true;
      this.authenticationService.login(this.post.email, this.post.password).subscribe((data: any)=>{
        console.log(data);
      if(data){
        this.router.navigate(['/home']);
       }else{
         this.noMatch=true;
         this.createForm();
       }});
                
    }

}
