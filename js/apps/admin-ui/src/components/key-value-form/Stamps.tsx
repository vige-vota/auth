import { Grid, GridItem, InputGroup } from "@patternfly/react-core";
import { Fragment } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { StampText } from "./StampText";

type StampsProps = {
  name: string;
};

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
                <StampText {...register(`${name}.${index}.value`)} />
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
