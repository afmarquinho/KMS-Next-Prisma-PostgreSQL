type Props = {
    label: string;
  };

export const SectionTitle =  (props: Props) => {
    return (
      <h2
        className={`font-medium my-5 text-left text-blue-900 dark:text-yellow-500`}
      >
        {props.label}
      </h2>
    );
  };
  