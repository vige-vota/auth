import { Component, createRef, forwardRef } from "react";
import { OUIAProps } from "@patternfly/react-core/helpers";

export interface StampTextProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "disabled" | "ref">,
    OUIAProps {
  /** Value of the text input. */
  value?: string | number;
  /** A reference object to attach to the text input box. */
  innerRef?: React.RefObject<any>;
}

export class StampTextBase extends Component<StampTextProps> {
  static displayName = "StampTextBase";
  inputRef = createRef<HTMLInputElement>();

  constructor(props: StampTextProps) {
    super(props);
  }

  restoreText = () => {
    const inputRef = this.props.innerRef || this.inputRef;
    // restore the value
    (inputRef.current as HTMLInputElement).value = String(this.props.value);
  };

  render() {
    const { innerRef, value, ...props } = this.props;

    return (
      <input
        {...props}
        value={this.sanitizeInputValue(value)}
        ref={innerRef || this.inputRef}
      />
    );
  }

  private sanitizeInputValue = (value: string | number | undefined) =>
    typeof value === "string" ? value.replace(/\n/g, " ") : value;
}

export const StampText = forwardRef(
  (props: StampTextProps, ref: React.Ref<HTMLInputElement>) => (
    <StampTextBase {...props} innerRef={ref as React.MutableRefObject<any>} />
  )
);
StampText.displayName = "StampText";
