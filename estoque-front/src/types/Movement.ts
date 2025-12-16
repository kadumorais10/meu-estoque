export type MovementType = "IN" | "OUT" | "ADJUST" | "LOSS";

export type Movement = {
  id: string;
  product_id: string;
  type: MovementType;
  quantity: number;
  previous_quantity: number;
  new_quantity: number;
  reason: string;
  created_at: string;
};

