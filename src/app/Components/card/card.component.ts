import { NotificationService } from './../../services/notification.service';
import { DataService } from './../../services/data.service';
import { Component, Input } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { Heroi } from '../../Models/Herois';
import { Superpoderes } from '../../Models/Superpoderes';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf, DatePipe, FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  novoHero: Heroi = new Heroi(0, "", "", undefined as any as Date, 0, 0, []);
  @Input() heroi!: Heroi;
  private dataService: DataService<Heroi>;
  private notificationService: NotificationService;
  constructor(dataService: DataService<Heroi>, notificationService: NotificationService) {
    this.dataService = dataService;
    this.notificationService = notificationService;
    document.addEventListener("UpdatePoderes", (e: any) => {
      this.AtualizaPoderes(e.detail);
    });
  }

  AdicionarPoder() {
    const lista = document.querySelector("app-lista-superpoderes") as HTMLDivElement;
    document.dispatchEvent(new CustomEvent("AtualizaListaPoderes"));
    lista.style.display = "block";
  }

  Adicionar() {
    const button = document.getElementById("btnAdicionar");
    if (!this.ValidaHeroi(this.novoHero)) {
      return;
    }
    button?.setAttribute("disabled", "true");
    this.dataService.post("herois", this.novoHero).subscribe({
      next: (data) => {
        this.notificationService.showToastr("Heroi adicionado com sucesso!");
        this.Limpar();
        document.dispatchEvent(new CustomEvent("UpdateEventList"));
        button?.removeAttribute("disabled");
      },
      error: (error) => {
        if (error.status == 400) {
          this.notificationService.showToastr(error.error);
        }
        else this.notificationService.showToastr("Erro ao adicionar heroi!");
        button?.removeAttribute("disabled");
      }
    });
  }

  Limpar() {
    this.novoHero.id = 0;
    this.novoHero.nome = "";
    this.novoHero.nomeHeroi = "";
    this.novoHero.dataNascimento = undefined as any as Date;
    this.novoHero.altura = 0;
    this.novoHero.peso = 0;
    this.novoHero.listaSuperpoderes = [];
  }


  Apagar(id: number) {
    const button = document.getElementById("btnApagar");
    button?.setAttribute("disabled", "true");
    this.dataService.delete("herois", id).subscribe({
      error: (error) => {
        if (error.status == 200) {
          this.notificationService.showToastr("Heroi apagado com sucesso!");
          document.dispatchEvent(new CustomEvent("UpdateEventList"));
        }
        else if (error.status == 400) {
          this.notificationService.showToastr(error.error);
        }
        else this.notificationService.showToastr("Erro ao apagar heroi!");
        button?.removeAttribute("disabled");
      }
    });
  }

  Editar(heroi: Heroi) {
    document.dispatchEvent(new CustomEvent("EditarHeroi", { detail: heroi.id }));
  }

  Detalhes(id: number) {
    document.dispatchEvent(new CustomEvent("DetalheHeroi", { detail: id }));
  }

  private ValidaHeroi(heroi: Heroi): boolean {
    if (heroi.nome == "") {
      this.notificationService.showToastr("Nome do heroi não pode ser vazio!");
      return false;
    }
    if (heroi.nomeHeroi == "") {
      this.notificationService.showToastr("Nome do heroi não pode ser vazio!");
      return false;
    }
    if (!heroi.dataNascimento) {
      this.notificationService.showToastr("Data de nascimento do heroi não pode ser vazio, nem inválida!");
      return false;
    }
    if (heroi.altura == 0) {
      this.notificationService.showToastr("Altura do heroi não pode ser vazio!");
      return false;
    }
    if (heroi.peso == 0) {
      this.notificationService.showToastr("Peso do heroi não pode ser vazio!");
      return false;
    }
    return true;
  }

  private AtualizaPoderes(superpoderes: Superpoderes[]) {
    this.novoHero.listaSuperpoderes = superpoderes;
  }

}
