import { Component } from '@angular/core';
import { VideoComponent } from '../../components/video/video.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [VideoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}


// function getNumberOfGames(x: number): number {
//   if (x < 1) {
//     return 0;
//   }

//   x = x > 100 ? 100 : x

//   const pass = Math.ceil(x / 2);
//   const games = Math.floor(x / 2);

//   return x > 2 ? games + getNumberOfGames(pass) : games;
// }

// console.log(getNumberOfGames(2))
// let acc = 0;

// // for (let i = 2; i <= 10; i++) {
// //   acc = acc + getNumberOfGames(i)
// // }

// // console.log(acc)
// const n = 100
// console.log(n * (n/2) - n/2);
