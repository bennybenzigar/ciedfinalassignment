import { Component, OnInit ,OnDestroy} from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  // email:any=''
  // password:any=''
  // btnDisabled:boolean=true
  loginData: any
  loginForm!: FormGroup
  flags:any=[]
  selectedOption:any
  showPassword: boolean = false;
invalidDetails:boolean=false
loginDataSubscription!:Subscription
  constructor(private dataService: DataService, private formBuilder: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    localStorage.removeItem('user')
    localStorage.removeItem('l')
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],

      password: ['', Validators.required],
      checkbox: [false, Validators.requiredTrue]
    })

    this.getLoginDetails()
    this.getFlag()
  }
  getFlag() {
    this.dataService.getFlags()
      .pipe(map((res: any) => {
        let data:any = []
        for (let item of res) {
         let d={ name:item.altSpellings[0],
            flagss:item.flags.png}
         data.push(d)

        }
        return data
      }))
      .subscribe((res: any) => {
        console.log(res)
        this.flags=res
        // console.log(this.flags,'f')
      })
  }
  getLoginDetails() {
    this.loginDataSubscription=  this.dataService.loginData$.subscribe((res: any) => {
      this.loginData = res
    })
    // console.log(this.loginData, 'll')
  }
  login() {

    if (this.loginForm.valid) {

      if (this.loginForm.value.email.toLowerCase() == this.loginData.email.toLowerCase()) {

        if (this.loginForm.value.password.toLowerCase() == this.loginData.password.toLowerCase()) {
          this.dataService.authenticated = true
          localStorage.setItem('user',JSON.stringify(this.loginForm.value.email))
          localStorage.setItem('l',JSON.stringify(true))
          this.router.navigateByUrl('dashboard')
          // this.router.navigate['/l']
          // window.location.reload()


        }
        else {
          alert('please check your password')
        }
      }
      else {
        alert('please check your email')
this.invalidDetails=true
      }
    }
    else {
      alert('invalid form')
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnDestroy(): void {
    this.loginDataSubscription.unsubscribe()
  }
}