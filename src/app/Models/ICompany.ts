export interface ICompany {
  id?: string;
  nome: string;
  cnpj: string;
  email: string;
  address: {
    uf: string;
    bairro: string;
    logradouro: string;
    numero: string;
    cep: string;
    complemento: string;
    id?: string
  };
  currentRootCoinValues: {
    code: string;
    // codein: string;
    // name: string;
    // high: string;
    // low: string;
    // pctChange: string;
    // open: string;
    // bid: string;
    // ask: string;
    // varBid: string;
    // timestamp: string;
    // create_date: string;
    // id: string
  };
}
