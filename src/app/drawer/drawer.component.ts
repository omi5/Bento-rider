import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit{
  ngOnInit(): void {
   this.open()
  }
  visible = false;
  
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
