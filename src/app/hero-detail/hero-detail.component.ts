import { Component, OnInit,Input } from '@angular/core';

import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
 
  // @Input() hero?:Hero;
  hero?:Hero;
  constructor(
    //usado para extrair variaveis da url
    private route: ActivatedRoute,
    //pega os heroes do "serve"
    private heroService: HeroService,
    //serviço angular usado para interagir como  browser
    private location: Location
  ) { }

  ngOnInit(): void {
    //The route.snapshot is a static image of the route information shortly after the component was created.
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.heroService.getHero(id).subscribe(hero=>{this.hero=hero});
  }

  save(): void{
    if(this.hero){
      this.heroService.updateHero(this.hero).subscribe(()=>this.goback());
    }
  }
  //subscribe é chamado de volta quando o metodo é executado 
  goback():void{
    this.location.back();
  }
}
