import { MessageService } from './../message.service';
import { HeroService } from './../hero.service';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
 
  // heroes = new mock().HEROES;
  heroes :Hero[] =[];
  selectedHero?:Hero;
  // hero:Hero ={
  //   id:1,
  //   name:"Windstorm"
  // }
    
  // constructor(private heroService:HeroService, private messageService: MessageService) { }
  constructor(private heroService:HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  // onSelect(hero:Hero):void{
  //   this.selectedHero = hero;
  //   this.messageService.add("HeroesComponent: selected hero id="+`${hero.id}`);
  // }

  getHeroes():void{
    // this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes().subscribe(heroes=>{this.heroes = heroes});
  }

  Add(name: string):void{
    name = name.trim();
    if(!name){return;}
    this.heroService.addHero({name} as Hero).subscribe(hero => {this.heroes.push(hero)});
  }

  Delete(hero: Hero): void{
    this.heroes = this.heroes.filter(heroOfList=>{heroOfList !== hero})
    this.heroService.deleteHero(hero.id).subscribe(data=>{this.ngOnInit()});
    
  }


}
