import { Superpoderes } from './Superpoderes';

export class Heroi {
  id: number;
  nome: string;
  nomeHeroi: string;
  dataNascimento: Date;
  altura: number;
  peso: number;
  listaSuperpoderes?: Superpoderes[];

  constructor(id: number, nome: string, nomeHeroi: string, dataNascimento: Date, altura: number, peso: number, listaSuperpoderes: Superpoderes[] = []) {
    this.id = id;
    this.nome = nome;
    this.nomeHeroi = nomeHeroi;
    this.dataNascimento = dataNascimento;
    this.altura = altura;
    this.peso = peso;
    this.listaSuperpoderes = listaSuperpoderes;
  }
}
