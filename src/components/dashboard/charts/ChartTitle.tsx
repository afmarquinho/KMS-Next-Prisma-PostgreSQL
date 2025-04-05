type Props = {
  title?: string;
};

export const ChartTitle = ({ title = "Consolidación"}: Props) => {
  return (
    <h3
      className={` text-center text-blue-900 dark:text-yellow-500 border-b-[2px] border-slate-200 dark:border-slate-700 font-bold py-2 text-base`}
    >
      {title}
    </h3>
  );
};
