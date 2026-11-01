export interface ProductRequestDTO {
  name: string;
  sku: string;
  description?: string;
  costPrice: number;
  salePrice: number;
  quantity: number;
  minimumStock: number;
  maximumStock: number;
  active: boolean;
}

export interface ProductResponseDTO extends ProductRequestDTO {
  id: number;
}
