import { NgFor, NgIf } from '@angular/common';
import { Superpoderes } from './../../Models/Superpoderes';
import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-superpoderes',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './lista-superpoderes.component.html',
  styleUrl: './lista-superpoderes.component.scss'
})
export class ListaSuperpoderesComponent {
  novoSuperpoder: Superpoderes = new Superpoderes(0, "", "");
  superpoderesSelecionados: Superpoderes[] = [];
  listaSuperpoderes: Superpoderes[] = [];
  private dataService: DataService<Superpoderes>;
  constructor(dataService: DataService<Superpoderes>) {
    this.dataService = dataService;
    document.addEventListener("AtualizaListaPoderes", () => {
      this.BuscaSuperpoderes();
    });
  }

  BuscaSuperpoderes() {
    this.dataService.get("superpoderes").subscribe({
      next: (data) => {
        this.listaSuperpoderes = data as any as Superpoderes[];
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  CriarSuperPoder() {
    const button = document.getElementById("btnAdicionar");
    if (!this.ValidaSuperpoder(this.novoSuperpoder)) {
      return;
    }
    button?.setAttribute("disabled", "true");
    this.dataService.post("superpoderes", this.novoSuperpoder).subscribe({
      next: (data) => {
        this.BuscaSuperpoderes();
        this.novoSuperpoder = new Superpoderes(0, "", "");
        button?.removeAttribute("disabled");
      },
      error: (error) => {
        if (error.status == 400) {
          console.log(error.error);
        }
        else console.log("Erro ao adicionar superpoder!");
        button?.removeAttribute("disabled");
      }
    });
  }

  AdicionaSuperPoder() {
    document.dispatchEvent(new CustomEvent("UpdatePoderes", { detail: this.superpoderesSelecionados }));
    this.FechaLista();
  }


  ApagarSuperPoderes() {
    this.superpoderesSelecionados.forEach((poder) => {
      this.dataService.delete("superpoderes", poder.id).subscribe({
        next: (data) => {
          this.BuscaSuperpoderes();
        },
        error: (err) => {
          console.log(err);
        }
      });
    })
    this.FechaLista();
  }

  SelecionaPoder(id: number){
    const label = document.querySelector("#label--" + id) as HTMLLabelElement;
    const checkbox = document.querySelector("#checkbox--" + id) as HTMLInputElement;
    if(checkbox.checked){
      label.classList.add("superpoderes__checkbox__label--active");
      this.superpoderesSelecionados.push(this.listaSuperpoderes.find((poder) => poder.id == id) as Superpoderes);
    }
    else{
      label.classList.remove("superpoderes__checkbox__label--active");
      this.superpoderesSelecionados = this.superpoderesSelecionados.filter((poder) => poder.id != id);
    }
  }

  FechaLista() {
    const lista = document.querySelector("app-lista-superpoderes") as HTMLDivElement;
    this.LimpaSelecao();
    lista.style.display = "none";
  }

  private ValidaSuperpoder(novoSuperpoder: Superpoderes) {
    if (novoSuperpoder.superpoder == "") {
      return false;
    }
    return true;
  }

  private LimpaSelecao(){
    this.superpoderesSelecionados.forEach((poder) => {
      const label = document.querySelector("#label--" + poder.id) as HTMLLabelElement;
      const checkbox = document.querySelector("#checkbox--" + poder.id) as HTMLInputElement;
      label.classList.remove("superpoderes__checkbox__label--active");
      checkbox.checked = false;
    });
    this.superpoderesSelecionados = [];
  }
}
