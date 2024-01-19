import { NotificationService } from './../../services/notification.service';
import { DataService } from './../../services/data.service';
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Heroi } from '../../Models/Herois';
import { Superpoderes } from '../../Models/Superpoderes';

@Component({
  selector: 'app-editar-heroi',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './editar-heroi.component.html',
  styleUrl: './editar-heroi.component.scss'
})
export class EditarHeroiComponent {
  heroi: Heroi;
  dataAniversarioFormatado: string = "";
  listaSuperpoderes: Superpoderes[] = [];
  dataService: DataService<Heroi>;
  notificationService: NotificationService;
  constructor(dataService: DataService<Heroi>, notificationService: NotificationService) {
    this.heroi = new Heroi(0, "", "", new Date(), 0, 0, []);
    this.dataService = dataService;
    this.notificationService = notificationService;
    document.addEventListener("EditarHeroi", (e: any) => {
      this.carregaHeroi(e.detail as number);
      this.carregaSuperpoderes();
      this.AbrirLista();
    });
  }

  AbrirLista() {
    const editor = document.querySelector("app-editar-heroi") as HTMLDivElement;
    editor.style.display = "block";
  }

  cancelarEdicao() {
    const editor = document.querySelector("app-editar-heroi") as HTMLDivElement;
    editor.style.display = "none";
  }

  salvarAlteracoes() {
    this.heroi.dataNascimento = new Date(this.dataAniversarioFormatado);
    const button = document.getElementById("btnSalvar");
    if (!this.ValidaHeroi(this.heroi)) {
      return;
    }
    button?.setAttribute("disabled", "true");
    this.dataService.put("herois", this.heroi.id, this.heroi).subscribe({
      next: (data) => {
        this.notificationService.showToastr("Heroi alterado com sucesso!");
        this.cancelarEdicao();
        document.dispatchEvent(new CustomEvent("UpdateEventList"));
        button?.removeAttribute("disabled");
      },
      error: (error) => {
        if (error.status == 400) {
          this.notificationService.showToastr(error.error);
        }
        else this.notificationService.showToastr("Erro ao alterar heroi!");
        button?.removeAttribute("disabled");
      }
    });
  }


  SelecionaPoder(id: number) {
    const label = document.querySelector("#label--" + id) as HTMLLabelElement;
    const checkbox = document.querySelector("#checkbox--" + id) as HTMLInputElement;
    if(checkbox.checked){
      label.classList.add("heroi__checkbox__label--active");
      if(this.heroi.listaSuperpoderes)
        this.heroi.listaSuperpoderes.push(this.listaSuperpoderes.find((poder) => poder.id == id) as Superpoderes);
    }
    else{
      label.classList.remove("heroi__checkbox__label--active");
      if(this.heroi.listaSuperpoderes)
        this.heroi.listaSuperpoderes = this.heroi.listaSuperpoderes.filter((poder) => poder.id != id);
    }
  }

  private ValidaHeroi(heroi: Heroi): boolean {
    if (heroi.nome == "") {
      this.notificationService.showToastr("Nome é obrigatório!");
      return false;
    }
    if (heroi.nomeHeroi == "") {
      this.notificationService.showToastr("Nome do heroi é obrigatório!");
      return false;
    }
    if (heroi.dataNascimento == undefined) {
      this.notificationService.showToastr("Data de nascimento é obrigatório!");
      return false;
    }
    if (!heroi.dataNascimento) {
      this.notificationService.showToastr("Data Iválida!");
      return false;
    }
    return true;
  }

  private carregaHeroi(id: number) {
    this.dataService.get("herois/" + id).subscribe({
      next: (data) => {
        this.heroi = data as any as Heroi;
        const dia = new Date(this.heroi.dataNascimento);
        this.dataAniversarioFormatado = dia.getFullYear().toString().padStart(4, "0") + "-" + (dia.getMonth() + 1).toString().padStart(2, "0") + "-" + dia.getDate().toString().padStart(2, "0");
        this.PintaPoderesHeroi();
      },
      error: () => {
        this.notificationService.showToastr("Erro ao buscar heroi!");
      }
    });
  }

  private carregaSuperpoderes() {
    this.dataService.get("superpoderes").subscribe({
      next: (data) => {
        this.listaSuperpoderes = data as any as Superpoderes[];
      },
      error: () => {
        this.notificationService.showToastr("Erro ao buscar superpoderes!");
      }
    });
  }

  private PintaPoderesHeroi() {
    if(this.heroi.listaSuperpoderes)
      this.heroi.listaSuperpoderes.forEach((poder) => {
        const label = document.querySelector("#label--" + poder.id) as HTMLLabelElement;
        const checkbox = document.querySelector("#checkbox--" + poder.id) as HTMLInputElement;
        label.classList.add("heroi__checkbox__label--active");
        checkbox.checked = true;
      });
  }

}
