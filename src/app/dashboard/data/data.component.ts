import { Component ,OnInit,OnDestroy} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit, OnDestroy{
  viewbtn = "View All"
  takeValue: number = 5
  takeBoolean: boolean = true
  tableData: any = []
  cardData: any = []
  loadedComponentPath!: string;
  screenWidth: any
  isStyled: boolean = false
  hidenav: boolean = true
  l: any;
cardDataSubscription!:Subscription
tableDataSubscription!:Subscription
screenwidthSubscription!:Subscription
  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
   


// this.load()
    this.getTableData()
    this.getCardData()

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadedComponentPath = event.url;
      }
    });
    // console.log(this.loadedComponentPath,'lc')
   this.screenwidthSubscription= this.dataService.getScreenWidth().subscribe((res: any) => {
      this.screenWidth = res;
      this.updateSidenavVisibility();
    });

    this.dataService.getDivVisibility().subscribe((res: any) => {
      this.hidenav = res;
      this.updateSidenavVisibility();
    });
  }

  getTableData() {
    this.tableData = []
   this.tableDataSubscription= this.dataService.tableData$.pipe(take(5)).subscribe((res: any) => {
      this.tableData.push(res)
    })
  }

  getCardData() {
   this.cardDataSubscription= this.dataService.cardData$.subscribe((res: any) => {
      this.cardData.push(res)
    })
  }
load(){
  
  this.l=localStorage.getItem('l')
  // console.log(this.l,'ll')
  if(this.l=='true'){
    localStorage.removeItem('l')
    // window.location.reload()
  }
  
// this.router.navigateByUrl('dashboard')
}
  getAllData() {
    this.tableData = []
    this.dataService.tableData$.subscribe((res: any) => {
      this.tableData.push(res)
    })
  }

  view() {
    if (this.viewbtn == "View All") {
      this.viewbtn = "View Less"
      this.getAllData()
    } else if (this.viewbtn == "View Less") {
      this.viewbtn = "View All"
      this.getTableData()
    }
  }

  shouldDisplaySidenav(): string {
    if (this.screenWidth < 768) {
      return this.hidenav ? 'block' : 'none';
    }
    return 'block';
  }

  private updateSidenavVisibility() {
    if (this.screenWidth < 768) {
      this.hidenav = false;
    }
  }

  changeStyle() {
    if (this.screenWidth < 768) {
      this.isStyled = true
    } else {
      this.hidenav = true
    }
  }

  ngOnDestroy(): void {
    this.cardDataSubscription.unsubscribe()
    this.tableDataSubscription.unsubscribe()
    this.screenwidthSubscription.unsubscribe()
  }
}
