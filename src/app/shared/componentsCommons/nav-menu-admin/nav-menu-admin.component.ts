import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, debounceTime, fromEvent, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nav-menu-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-menu-admin.component.html',
  styleUrl: './nav-menu-admin.component.scss'
})
export class NavMenuAdminComponent {
  private _unsubscriber$: Subject<any> = new Subject();
  public screenWidth$: BehaviorSubject<any> = new BehaviorSubject(null);

  toglle: boolean = false;
  public innerWidth: any;
  @Output() clickOpcion = new EventEmitter();

  constructor() {
    // fromEvent(window, 'resize')
    // .pipe(
    //   debounceTime(1000),
    //   takeUntil(this._unsubscriber$)
    // ).subscribe((evt: any) => {
    //   this._setScreenWidth(evt.target.innerWidth);
    //   // this._setMediaBreakpoint(evt.target.innerWidth);
    // });
  }

  private _setScreenWidth(width: number): void {
    this.screenWidth$.next(width);
    console.log('this.screenWidth$',this.screenWidth$);
    console.log('width',width);
  }


  ngOnInit() {
  }
  
  addToggle() {
    this.toglle = !this.toglle;
    this.clickOpcion.emit();
  }

}
