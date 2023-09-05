import { Component, ElementRef, OnInit, ViewChild ,AfterViewInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
// import { DataService } from '../services/data.service';

declare var bootstrap: any;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit ,AfterViewInit, OnDestroy{
  @ViewChild('offcanvasElement') offcanvasElement!: ElementRef;
screenWidthSubscription!:Subscription;
  screenWidth: any
  // sidenavBtn:any
  list: any = [
    { name: 'Dashboard', path: '/dashboard', icon: 'fa-solid fa-table' },
    // { name: 'Page not found', path: '/pagenotfound', icon: 'fa-solid fa-triangle-exclamation' }
    // <i class="fa-solid fa-table"></i>
    // <i class="fa-solid fa-triangle-exclamation"></i>
  ]
  isStyled: any;
  constructor(private dataService: DataService,private router:Router) { }
  ngOnInit(): void {
  this.screenWidthSubscription=  this.dataService.getScreenWidth().subscribe((res: any) => {
      // console.log(res, 'scr')
      this.screenWidth = res
      // this.sidenavBtn=true
    })
  }
  hidefunction(){
    if(this.screenWidth<768){
      this.isStyled=true
    }
  }

  getStyle() {
   
    return this.isStyled ? 'display:none' : '';
  }

  hidesidenav(){
    this.dataService.setDivVisibility(false)
  }
  logoutfn(){
    this.dataService.authenticated=false
  
    localStorage.removeItem('user')
    localStorage.removeItem('l')
    window.location.reload()
    this.router.navigate(['/login']);
  }
  closeOffcanvas() {
    // Close the offcanvas using Bootstrap's JavaScript API
    const offcanvas = this.offcanvasElement.nativeElement;
    const bsOffcanvas = new bootstrap.Offcanvas(offcanvas);
    bsOffcanvas.hide();
  }
  ngAfterViewInit(): void {
      
    const offcanvas = this.offcanvasElement.nativeElement;
    const bsOffcanvas = new bootstrap.Offcanvas(offcanvas);
    bsOffcanvas.show();
  }

  ngOnDestroy(): void {
    this.screenWidthSubscription.unsubscribe()
  }
}
