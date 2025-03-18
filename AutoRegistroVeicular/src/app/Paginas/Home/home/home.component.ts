import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  images: string[] = [];
  currentIndex: number = 0;

ngOnInit(): void {
  this.loadImages();
}

loadImages() {
  this.images = ['../../assets/Imagens/imagemCarrossel1.png',
     'assets/img2.jpg', 'assets/img3.jpg'];
}

nextSlide() {
  this.currentIndex = (this.currentIndex + 1) % this.images.length;
}

prevSlide() {
  this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
}
}
