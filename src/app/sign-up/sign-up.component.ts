import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  closeForSignup(){
    this.notifyParent.emit();
  }
  
}
