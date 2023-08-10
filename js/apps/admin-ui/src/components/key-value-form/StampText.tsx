import styles from "@patternfly/react-styles/css/components/FormControl/form-control";
import { css } from "@patternfly/react-styles";
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
  /** Flag to show if the text input is disabled. */
  isDisabled?: boolean;
  /** @deprecated Use readOnlyVariant instead. Flag to show if the text input is read only. */
  isReadOnly?: boolean;
  /** Read only variant. */
  readOnlyVariant?: "plain" | "default";
  isRequired?: boolean;
  /** Value of the text input. */
  value?: string | number;
  /** Aria-label. The text input requires an associated id or aria-label. */
  "aria-label"?: string;
  /** A reference object to attach to the text input box. */
  innerRef?: React.RefObject<any>;
  /** icon variant */
  iconVariant?: "calendar" | "clock" | "search";
  /** Use the external file instead of a data URI */
  isIconSprite?: boolean;
  /** Custom icon url to set as the text input"s background-image */
  customIconUrl?: string;
  /** Dimensions for the custom icon set as the text input"s background-size */
  customIconDimensions?: string;
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
    isRequired: false,
    isDisabled: false,
    isReadOnly: false,
    isIconSprite: false,
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
    const {
      innerRef,
      className,
      value,
      isReadOnly,
      readOnly,
      readOnlyVariant,
      isRequired,
      isDisabled,
      isIconSprite,
      iconVariant,
      customIconUrl,
      customIconDimensions,
      ouiaId,
      ouiaSafe,
      ...props
    } = this.props;

    const customIconStyle = {} as any;
    if (customIconUrl) {
      customIconStyle.backgroundImage = `url("${customIconUrl}")`;
    }
    if (customIconDimensions) {
      customIconStyle.backgroundSize = customIconDimensions;
    }

    return (
      <input
        {...props}
        className={css(
          styles.formControl,
          isIconSprite && styles.modifiers.iconSprite,
          readOnlyVariant === "plain" && styles.modifiers.plain,
          ((iconVariant && iconVariant !== "search") || customIconUrl) &&
            styles.modifiers.icon,
          iconVariant && styles.modifiers[iconVariant],
          className
        )}
        value={this.sanitizeInputValue(value)}
        required={isRequired}
        disabled={isDisabled}
        readOnly={!!readOnlyVariant || isReadOnly || readOnly}
        ref={innerRef || this.inputRef}
        {...((customIconUrl || customIconDimensions) && {
          style: customIconStyle,
        })}
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
