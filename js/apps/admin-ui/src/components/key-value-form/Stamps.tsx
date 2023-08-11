import { Grid, GridItem } from "@patternfly/react-core";
import { Fragment, Component, forwardRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

type StampsProps = {
  name: string;
};

export interface StampTextProps {
  /** Value of the text input. */
  value?: string | number;
  /** A reference object to attach to the text input box. */
  innerRef?: React.Ref<HTMLOutputElement>;
}

export class StampTextBase extends Component<StampTextProps> {
  static displayName = "StampTextBase";

  render() {
    const { innerRef, value, ...props } = this.props;

    return (
      <output {...props} ref={innerRef}>
        {value}
      </output>
    );
  }
}

export const StampText = forwardRef(
  (props: StampTextProps, ref: React.Ref<HTMLOutputElement>) => (
    <StampTextBase {...props} innerRef={ref} />
  )
);
StampText.displayName = "StampText";

export const Stamps = ({ name }: StampsProps) => {
  const { control, register } = useFormContext();

  const { fields } = useFieldArray({
    control,
    name,
  });

  return fields.length > 0 ? (
    <Grid hasGutter>
      {fields.map((attribute, index) => {
        return (
          <Fragment key={index}>
            <GridItem span={6}>
              <StampText {...register(`${name}.${index}.value`)} />
            </GridItem>
          </Fragment>
        );
      })}
    </Grid>
  ) : (
    <Grid hasGutter />
  );
};
