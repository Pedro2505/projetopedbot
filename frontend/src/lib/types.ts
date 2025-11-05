export interface ProductFormData {
  nome: string;
  lote: string;
  fornecedor: string;
  data_validade: string;
  preco: string;
  quantidade: string;
}

export interface ProductTotals {
  total_produtos: number;
  total_quantidade: number;
}

export interface Alert {
  product: string;
  message: string;
  type: 'low_stock' | 'expiring' | 'high_demand';
}

export interface Activity {
  id: number;
  tipo: 'entrada' | 'venda' | 'ajuste';
  produto: string;
  quantidade: number;
  data: string;
  detalhes: string;
}

export interface Product {
  id?: number;
  nome: string;
  lote?: string;
  fornecedor?: string;
  data_validade?: string;
  preco?: string | number;
  quantidade: number;
}

export interface Supplier {
  id?: number;
  nome: string;
  contato?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  observacoes?: string;
}

export interface SupplierPayload {
  nome: string;
  contato?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  observacoes?: string;
}

export interface SupplierResp extends SupplierPayload {
  id: number;
}
