import { Component, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CardComponent } from '../../Components/card/card.component';
import { Heroi } from '../../Models/Herois';
import { NgFor } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { ListaSuperpoderesComponent } from '../../Components/lista-superpoderes/lista-superpoderes.component';
import { DetalhesHeroiComponent } from '../../Components/detalhes-heroi/detalhes-heroi.component';
import { EditarHeroiComponent } from '../../Components/editar-heroi/editar-heroi.component';

@Component({
  selector: 'app-lista-herois',
  standalone: true,
  imports: [CardComponent, NgFor, ListaSuperpoderesComponent, DetalhesHeroiComponent, EditarHeroiComponent],
  templateUrl: './lista-herois.component.html',
  styleUrl: './lista-herois.component.scss'
})
export class ListaHeroisComponent {
  listaHerois: Heroi[] = [];
  private dataService: DataService<Heroi>;
  private notificationService: NotificationService;
  UpdateEventList: EventEmitter<any> = new EventEmitter();
  constructor(dataService: DataService<Heroi>, notificationService: NotificationService) {
    this.dataService = dataService;
    this.notificationService = notificationService;
  }

  ngOnInit() {
    this.BuscaHerois();
    document.addEventListener("UpdateEventList", () => {
      this.BuscaHerois();
    });
  }

  BuscaHerois() {
    this.dataService.get("herois").subscribe({
      next: (data) => {
        this.listaHerois = data as any as Heroi[];
      },
      error: (err) => {
        this.notificationService.showToastr("Erro ao buscar herois!");
      }
    });
  }

}
