import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { mock } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

@Injectable({
  //quando o service esta no nivel de roo  ele cria uma instacia só
  //para a aplicaçao inteira
  providedIn: 'root'
})
export class HeroService {

  private heroesurl = 'api/heroes';
  private httpOptions ={
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor( private http: HttpClient, private messageService:MessageService) { }

  // getHeroes():Hero[]{
  //   return new mock().HEROES;
  // }

  //pegar data de service sem http
  //observable trnaforma em um metodo assincrono
  // getHeroes():Observable<Hero[]>{
  //   const heroes = of(new mock().HEROES);
  //   this.messageService.add("HeroService: fetched heroes");
  //   return heroes;
  // }
  
  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesurl).pipe(tap(_=>this.log("fetched heroes")),catchError(this.handleError<Hero[]>("getHeroes", [])));
  }

  //maneira de fazer sem http
  // getHero(id: number):Observable<Hero>{
  //   const hero:Hero = new mock().HEROES.find(hero=>{return hero.id === id})!;
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(hero);
  // }
  getHero(id: number): Observable<Hero>{
    const url =`${this.heroesurl}/${id}`;
    return this.http.get<Hero>(url).pipe(tap(_=>this.log(`fetched herp id=${id}`)),catchError(this.handleError<Hero>(`getHero id=${id}`)));
  }

  updateHero(hero: Hero): Observable<any>{
    return this.http.put(this.heroesurl, hero, this.httpOptions).pipe(tap(_=>this.log(`updated hero id=${hero.id}`)), catchError(this.handleError<any>("updateHero")));
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesurl, hero, this.httpOptions).pipe(tap((newHero: Hero)=> this.log(`added hero w/ id=${newHero.id}`)),catchError(this.handleError<Hero>("addHero")));
  };

  deleteHero(id: number):Observable<Hero>{
    const url = `${this.heroesurl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(tap(_=>this.log(`deleted hero id=${id}`)),catchError(this.handleError<Hero>("DeleteHero")));
  }


  private log(message: string):void{
    this.messageService.add(`HeroService: ${message}`);
  }


  private handleError<T>(operation="operation", result?:T){
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
