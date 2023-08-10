import { Component, createRef, forwardRef } from "react";
import {
  getDefaultOUIAId,
  getOUIAProps,
  OUIAProps,
} from "@patternfly/react-core/helpers";

export interface StampTextProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "disabled" | "ref">,
    OUIAProps {
  /** Additional classes added to the text input. */
  className?: string;
  /** Value of the text input. */
  value?: string | number;
  /** Aria-label. The text input requires an associated id or aria-label. */
  "aria-label"?: string;
  /** A reference object to attach to the text input box. */
  innerRef?: React.RefObject<any>;
  /** Value to overwrite the randomly generated data-ouia-component-id.*/
  ouiaId?: number | string;
  /** Set the value of data-ouia-safe. Only set to true when the component is in a static state, i.e. no animations are occurring. At all other times, this value must be false. */
  ouiaSafe?: boolean;
}

interface StampTextState {
  ouiaStateId: string;
}

export class StampTextBase extends Component<StampTextProps, StampTextState> {
  static displayName = "StampTextBase";
  static defaultProps: StampTextProps = {
    "aria-label": "",
    className: "",
    ouiaSafe: true,
  };
  inputRef = createRef<HTMLInputElement>();

  constructor(props: StampTextProps) {
    super(props);
    if (!props.id && !props["aria-label"] && !props["aria-labelledby"]) {
      // eslint-disable-next-line no-console
      console.error(
        "Text input:",
        "Text input requires either an id or aria-label to be specified"
      );
    }
    this.state = {
      ouiaStateId: getDefaultOUIAId(StampTextBase.displayName),
    };
  }

  restoreText = () => {
    const inputRef = this.props.innerRef || this.inputRef;
    // restore the value
    (inputRef.current as HTMLInputElement).value = String(this.props.value);
    // make sure we still see the rightmost value to preserve cursor click position
    inputRef.current.scrollLeft = inputRef.current.scrollWidth;
  };

  render() {
    const { innerRef, className, value, ouiaId, ouiaSafe, ...props } =
      this.props;

    return (
      <input
        {...props}
        className={css(styles.formControl, className)}
        value={this.sanitizeInputValue(value)}
        ref={innerRef || this.inputRef}
        {...getOUIAProps(
          "StampText",
          ouiaId !== undefined ? ouiaId : this.state.ouiaStateId,
          ouiaSafe
        )}
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
