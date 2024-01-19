import { Component } from '@angular/core';
import { CardComponent } from './Components/card/card.component';
import { ListaHeroisComponent } from './Pages/lista-herois/lista-herois.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent, ListaHeroisComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{

}
