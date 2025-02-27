type Props = {
  label: string;
};

export const Subtitle = (props: Props) => {
  return (
    <h3 className={`italic font-medium text-base mb-5 text-left mt-5`}>
      {props.label}
    </h3>
  );
};
