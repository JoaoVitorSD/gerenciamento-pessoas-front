

export interface PessoaResumida {
  id: string;
  nome: string;
  dataNascimento: string;
  enderecoPrincipal?: Endereco;
}


export interface Endereco {
  id?: string;
  cep: string;
  logradouro: string;
  numero: string;
  cidade: string;
  estado: string;
  enderecoPrincipal: boolean;
}
export interface RequestProps {
  method: string;
  params?: Record<string, string>;
  body?: Object;
  path?: string;
}

export interface ResponseProps{
  ok: boolean;
  data: any;
  message?: string;
}