import { NotificationService } from './../../services/notification.service';
import { DataService } from './../../services/data.service';
import { Component } from '@angular/core';
import { Heroi } from '../../Models/Herois';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-detalhes-heroi',
  standalone: true,
  imports: [DatePipe, NgFor],
  templateUrl: './detalhes-heroi.component.html',
  styleUrl: './detalhes-heroi.component.scss'
})
export class DetalhesHeroiComponent {
  heroi?: Heroi;
  dataService: DataService<Heroi>;
  notificationService: NotificationService;
  constructor(dataService: DataService<Heroi>, notificationService: NotificationService) {
    this.dataService = dataService;
    this.notificationService = notificationService;
    document.addEventListener("DetalheHeroi", (e: any) => {
      this.carregaHeroi(e.detail as number);
      this.AbrirLista();
    });
  }

  FechaLista() {
    const lista = document.querySelector("app-detalhes-heroi") as HTMLDivElement;
    lista.style.display = "none";
  }

  AbrirLista() {
    const lista = document.querySelector("app-detalhes-heroi") as HTMLDivElement;
    lista.style.display = "block";
  }

  private carregaHeroi(id: number){
    this.dataService.get("herois/" + id).subscribe({
      next: (data) => {
        this.heroi = data as any as Heroi;
      },
      error: () => {
        this.notificationService.showToastr("Erro ao buscar heroi!");
      }
    });
  }
}
