import { EmptyState, Grid, GridItem, InputGroup } from "@patternfly/react-core";
import { Fragment } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { KeycloakTextInput } from "../keycloak-text-input/KeycloakTextInput";

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
          <Fragment key={attribute.id}>
            <GridItem span={6}>
              <InputGroup>
                <KeycloakTextInput
                  data-testid={`${name}-value`}
                  {...register(`${name}.${index}.value`, { required: true })}
                  isRequired
                />
              </InputGroup>
            </GridItem>
          </Fragment>
        );
      })}
    </Grid>
  ) : (
    <EmptyState
      data-testid={`${name}-empty-state`}
      className="pf-u-p-0"
      variant="xs"
    ></EmptyState>
  );
};
