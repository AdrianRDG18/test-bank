import { Currency } from "./currency.interface";

export interface WithDrawalResponse{
  success: boolean,
  message: string,
  bills?: Currency[] | null,
}
