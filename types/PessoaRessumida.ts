import { Endereco } from "@types/Endereco";

export interface PessoaResumida {
  id: string;
  nome: string;
  dataNascimento: string;
  enderecoPrincipal?: Endereco;
}

