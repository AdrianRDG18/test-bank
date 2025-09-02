import { Currency } from "./currency.interface";

export interface WithDrawalResponse{
  ok: boolean,
  msg: string,
  bills: Currency[] | null,
}
