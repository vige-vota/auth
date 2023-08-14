import { Component, forwardRef } from "react";
import { useFormContext } from "react-hook-form";

export interface StampTextProps {
  /** A reference object to attach to the text input box. */
  innerRef?: React.Ref<HTMLOutputElement>;
}

export class StampTextBase extends Component<StampTextProps> {
  render() {
    const { innerRef } = this.props;

    return <output ref={innerRef} />;
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
