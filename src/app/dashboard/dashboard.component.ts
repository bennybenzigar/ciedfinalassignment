import { Component,ElementRef,OnInit, ViewChild ,AfterViewInit, OnDestroy} from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
declare var bootstrap:any
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit,OnDestroy{
  screenWidthSubscription!:Subscription
  @ViewChild('offcanvasElement') offcanvasElement!:ElementRef
  screenWidth: any;
  hidenav: boolean=true;
  constructor(private dataService:DataService){}
  ngOnInit(): void {
    this.dataService.getScreenWidth().subscribe((res: any) => {
      this.screenWidth = res;
      this.updateSidenavVisibility();
    });
  }

  private updateSidenavVisibility() {
    if (this.screenWidth < 768) {
      this.hidenav = false;
    }
    else{
      this.hidenav=true
    }
  }

  ngAfterViewInit() {
   
    const offcanvas = this.offcanvasElement.nativeElement;
    const bsOffcanvas = new bootstrap.Offcanvas(offcanvas);
    bsOffcanvas.show();
  }

  ngOnDestroy(): void {
    this.screenWidthSubscription.unsubscribe()
  }
}
