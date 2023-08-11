import { Component, forwardRef } from "react";

export interface StampTextProps {
  /** Value of the text input. */
  value?: string | number;
  /** A reference object to attach to the text input box. */
  innerRef?: React.Ref<HTMLInputElement>;
}

export class StampTextBase extends Component<StampTextProps> {
  static displayName = "StampTextBase";

  render() {
    const { innerRef, value, ...props } = this.props;

    return <input {...props} value={value} ref={innerRef} />;
  }
}

export const StampText = forwardRef(
  (props: StampTextProps, ref: React.Ref<HTMLInputElement>) => (
    <StampTextBase {...props} innerRef={ref} />
  )
);
StampText.displayName = "StampText";
