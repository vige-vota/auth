import { Component, forwardRef } from "react";
import { useFormContext } from "react-hook-form";

export interface StampTextProps {
  /** Value of the text input. */
  value?: string;
  /** A reference object to attach to the text input box. */
  innerRef?: React.Ref<HTMLOutputElement>;
}

export class StampTextBase extends Component<StampTextProps> {
  static displayName = "StampTextBase";

  render() {
    const { innerRef, value } = this.props;

    return <output ref={innerRef}>{value}</output>;
  }
}

export const StampText = forwardRef(
  (props: StampTextProps, ref: React.Ref<HTMLOutputElement>) => (
    <StampTextBase {...props} innerRef={ref} />
  )
);
StampText.displayName = "StampText";

export const Stamps = () => {
  const { register } = useFormContext();

  return <StampText {...register(`attributes.2.value`)} />;
};
