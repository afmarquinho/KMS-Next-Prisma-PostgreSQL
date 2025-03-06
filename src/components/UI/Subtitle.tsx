type Props = {
  label: string;
};

export const Subtitle = (props: Props) => {
  return (
    <h2
      className={`font-bold text-base my-5 text-center text-blue-900 dark:text-yellow-500`}
    >
      {props.label}
    </h2>
  );
};
