export class Superpoderes {
  id: number;
  superpoder: string;
  descricao?: string;

  constructor(id: number, superpoder: string, descricao?: string) {
    this.id = id;
    this.superpoder = superpoder;
    this.descricao = descricao;
  }
}
