export interface Product {
  id_product: number
  product_name: string
  price: number
  files?: string[]
}

export interface Prova {
  id: number;
  nome: string;
  url: string;
}

export interface Disciplina {
  id: number;
  codigo: string;
  nome: string;
  descricao: string;
  provas: Prova[];
} 