import { Component, OnInit } from '@angular/core';
import lottie from 'lottie-web';
import bikeData from '../../assets/json/bike.json';


@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrl: './animation.component.css'
})
export class AnimationComponent implements OnInit {
  ngOnInit(): void {
    const container = document.getElementById('lottie-container') as Element; // Replace 'lottie-container' with the ID of the container where you want to render the animation
    lottie.loadAnimation({
      container: container,
      renderer: 'svg', // Choose the renderer ('svg', 'canvas', 'html')
      loop: true, // Whether the animation should loop
      autoplay: true, // Whether the animation should start automatically
      animationData: bikeData // Pass your animation data here
    });
  }

}
