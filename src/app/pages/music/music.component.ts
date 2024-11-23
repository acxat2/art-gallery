import { Component } from '@angular/core';
import { music, Music } from '../../../base/music';
import { VideoComponent } from "../../components/video/video.component";

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [VideoComponent],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent {
  public media: Music[] = music
  constructor() {

  }
}
