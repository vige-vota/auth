import { Grid, GridItem, InputGroup } from "@patternfly/react-core";
import { Fragment, forwardRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { StampText } from "./StampText";

type StampsProps = {
  name: string;
};

const StampPrint = forwardRef<HTMLInputElement>(({ ...props }, ref) => {
  return <StampText {...props} ref={ref} />;
});
StampPrint.displayName = "StampText";

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
              <InputGroup>
                <StampPrint {...register(`${name}.${index}.value`)} />
              </InputGroup>
            </GridItem>
          </Fragment>
        );
      })}
    </Grid>
  ) : (
    <Grid hasGutter />
  );
};
