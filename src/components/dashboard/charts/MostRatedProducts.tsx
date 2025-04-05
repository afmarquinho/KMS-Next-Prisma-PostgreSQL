import { ChartTitle } from "./ChartTitle";
import { Ratings } from "./Ratings";

const MostRatedProducts = async  () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/statistics`
      );
    
      const { ok, data, message } = await res.json();
      if (!ok || !data) {
        // return <p>Error al cargar los datos</p>;
        return <p>{message}</p>;
      }

  return (
    <>
     <ChartTitle title="Productos mas populares"/>
        {data.mostRatedProducts.map(
          (p: {
            Prod_id: number;
            Prod_name: string;
            Prod_rating: number;
            salePrice: number;
          }) => (
            <div
              key={p.Prod_id}
              className={`w-full p-2 bg-white dark:bg-slate-900 rounded shadow-md`}
            >
              <div className={`flex justify-between items-center`}>
                <span className={`font-medium`}>
                  {p.Prod_name}
                  </span>
                <span className={`font-bold`}>$ {p.salePrice}</span>
              </div>
              <div className={`flex`}>
                <Ratings rate={Number(p.Prod_rating)} />
              </div>
            </div>
          )
        )}
    </>
  )
}
export default MostRatedProducts