import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
    // small : number = 580
    size: 'large' | 'default' = 'default';

    ngOnInit(): void {
     this.open()
    }
    showLarge(): void {
      this.size = 'large';  
    }
    
    visible = false;
    
    open(): void {
      
      this.visible = true;
    }
  
    close(): void {
      this.visible = false;
    }
}
