import { Star } from "lucide-react";

type Props = {
  rate: number;
};

export const Ratings = ({ rate }: Props) => {
  return [1, 2, 3, 4, 5].map((i) => (
    <Star
      key={i}
      className={`h-4 w-5 ${i <= rate ? "text-amber-500" : "text-slate-500"}`}
    />
  ));
};
