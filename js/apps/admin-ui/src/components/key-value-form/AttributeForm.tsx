import type RoleRepresentation from "@keycloak/keycloak-admin-client/lib/defs/roleRepresentation";
import {
  ActionGroup,
  Button,
  FormGroup,
  Select,
  SelectOption,
  SelectVariant,
  Grid,
  GridItem,
} from "@patternfly/react-core";
import { FormProvider, UseFormReturn, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormAccess } from "../form-access/FormAccess";
import type { KeyValueType } from "./key-value-convert";
import { KeyValueInput } from "./KeyValueInput";
import { HelpItem } from "ui-shared";
import { useState, ReactElement, Fragment } from "react";
import {
  ZonesFieldRepresentation,
  level0,
  level1,
  level2,
  level3,
  level0value,
  level1value,
  level2value,
  level3value,
  initLocations,
} from "../../context/cities/CitiesProvider";
import {
  BlocksFieldRepresentation,
  blocksLevel,
  initBlocks,
} from "../../context/blocks/BlocksProvider";
import "./attribute-form.css";

export type AttributeForm = Omit<RoleRepresentation, "attributes"> & {
  attributes?: KeyValueType[];
};

export type AttributesFormProps = {
  form: UseFormReturn<AttributeForm>;
  save?: (model: AttributeForm) => void;
  reset?: () => void;
  fineGrainedAccess?: boolean;
};

const levelOptions = (
  locations: ZonesFieldRepresentation[],
  value: ZonesFieldRepresentation
) => {
  const options: ReactElement[] = [];
  locations.map((location: ZonesFieldRepresentation) => {
    options.push(
      <SelectOption selected={location === value} value={location.id}>
        {location.name}
      </SelectOption>
    );
  });
  return options;
};

const blockOptions = (
  translation: any,
  blocks: BlocksFieldRepresentation[],
  value: string
) => {
  const options: ReactElement[] = [];
  blocks.map((block: BlocksFieldRepresentation) => {
    let idx = 0;
    options.push(
      <SelectOption
        selected={block.name === value}
        key={`blocksLevel-${idx++}`}
        value={block.name}
      >
        {translation(`${block.name}`)}
      </SelectOption>
    );
  });
  return options;
};

export const AttributesForm = ({
  form,
  reset,
  save,
  fineGrainedAccess,
}: AttributesFormProps) => {
  const noSaveCancelButtons = !save && !reset;
  const {
    formState: { isDirty },
    handleSubmit,
  } = form;
  const [level0Open, setLevel0Open] = useState(false);
  const [level1Open, setLevel1Open] = useState(false);
  const [level2Open, setLevel2Open] = useState(false);
  const [level3Open, setLevel3Open] = useState(false);
  const [blocksOpen, setBlocksOpen] = useState(false);
  const locations = initLocations();
  const blocks = initBlocks();
  const { t } = useTranslation("users");
  let valueFromRender0: ZonesFieldRepresentation;
  let valueFromRender1: ZonesFieldRepresentation;
  let valueFromRender2: ZonesFieldRepresentation;
  let valueFromRender3: ZonesFieldRepresentation;

  return (
    <FormAccess
      role="manage-realm"
      onSubmit={save ? handleSubmit(save) : undefined}
      fineGrainedAccess={fineGrainedAccess}
      className="pf-u-mt-lg"
    >
      <FormProvider {...form}>
        <KeyValueInput name="attributes" />

        <FormGroup
          label={t("blocks")}
          fieldId="kc-blocks"
          labelIcon={
            <HelpItem
              helpText={t("users-help:blocks")}
              fieldLabelId="users:blocks"
            />
          }
        >
          <Controller
            name="attributes"
            defaultValue=""
            render={({ field }) => {
              const valueFromRender = field.value[0];
              if (valueFromRender !== undefined) {
                return (
                  <Select
                    toggleId="kc-blocks"
                    onToggle={() => setBlocksOpen(!blocksOpen)}
                    onSelect={(_, value) => {
                      field.onChange(value as string);
                      setBlocksOpen(false);
                    }}
                    selections={valueFromRender}
                    variant={SelectVariant.single}
                    aria-label={t("blocks")}
                    isOpen={blocksOpen}
                    placeholderText={t("users-help:blocks-ph")}
                    data-testid="select-blocks"
                  >
                    {blockOptions(t, blocksLevel(blocks), valueFromRender)}
                  </Select>
                );
              } else return <output>buuuuuublocks</output>;
            }}
          />
        </FormGroup>

        <fieldset className="border-top">
          <legend>
            <span className="text">{t("users:residence")}</span>
          </legend>
          <FormGroup
            label={t("level0")}
            fieldId="kc-level0"
            labelIcon={
              <HelpItem
                helpText={t("users-help:level0")}
                fieldLabelId="users:level0"
              />
            }
          >
            <Controller
              name="attributes"
              defaultValue=""
              render={({ field }) => {
                const fieldValue = field.value;
                valueFromRender0 = level0value(fieldValue, locations);
                return (
                  <Select
                    toggleId="kc-level0"
                    onToggle={() => {
                      setLevel0Open(!level0Open);
                    }}
                    onSelect={(_, value) => {
                      field.onChange(value as string);
                      setLevel0Open(false);
                    }}
                    selections={valueFromRender0}
                    variant={SelectVariant.single}
                    aria-label={t("level0")}
                    isOpen={level0Open}
                    placeholderText={t("users-help:level0-ph")}
                    data-testid="select-level0"
                  >
                    {levelOptions(level0(locations), valueFromRender0)}
                  </Select>
                );
              }}
            />
          </FormGroup>
          <FormGroup
            label={t("level1")}
            fieldId="kc-level1"
            labelIcon={
              <HelpItem
                helpText={t("users-help:level1")}
                fieldLabelId="users:level1"
              />
            }
          >
            <Controller
              name="attributes"
              defaultValue=""
              render={({ field }) => {
                const fieldValue = field.value;
                valueFromRender1 = level1value(fieldValue, locations);
                return (
                  <Select
                    toggleId="kc-level1"
                    onToggle={() => {
                      setLevel1Open(!level1Open);
                    }}
                    onSelect={(_, value) => {
                      field.onChange(value as string);
                      setLevel1Open(false);
                    }}
                    selections={valueFromRender1}
                    variant={SelectVariant.single}
                    aria-label={t("level1")}
                    isOpen={level1Open}
                    placeholderText={t("users-help:level1-ph")}
                    data-testid="select-level1"
                  >
                    {levelOptions(
                      level1(locations, valueFromRender0),
                      valueFromRender1
                    )}
                  </Select>
                );
              }}
            />
          </FormGroup>
          <FormGroup
            label={t("level2")}
            fieldId="kc-level2"
            labelIcon={
              <HelpItem
                helpText={t("users-help:level2")}
                fieldLabelId="users:level2"
              />
            }
          >
            <Controller
              name="attributes"
              defaultValue=""
              render={({ field }) => {
                const fieldValue = field.value;
                valueFromRender2 = level2value(fieldValue, locations);
                return (
                  <Select
                    toggleId="kc-level2"
                    onToggle={() => {
                      setLevel2Open(!level2Open);
                    }}
                    onSelect={(_, value) => {
                      field.onChange(value as string);
                      setLevel2Open(false);
                    }}
                    selections={valueFromRender2}
                    variant={SelectVariant.single}
                    aria-label={t("level2")}
                    isOpen={level2Open}
                    placeholderText={t("users-help:level2-ph")}
                    data-testid="select-level2"
                  >
                    {levelOptions(
                      level2(locations, valueFromRender1),
                      valueFromRender2
                    )}
                  </Select>
                );
              }}
            />
          </FormGroup>
          <FormGroup
            label={t("level3")}
            fieldId="kc-level3"
            labelIcon={
              <HelpItem
                helpText={t("users-help:level3")}
                fieldLabelId="users:level3"
              />
            }
          >
            <Controller
              name="attributes"
              defaultValue=""
              render={({ field }) => {
                const fieldValue = field.value;
                valueFromRender3 = level3value(fieldValue, locations);
                return (
                  <Select
                    toggleId="kc-level3"
                    onToggle={() => {
                      setLevel3Open(!level3Open);
                    }}
                    onSelect={(_, value) => {
                      field.onChange(value as string);
                      setLevel3Open(false);
                    }}
                    selections={valueFromRender3}
                    variant={SelectVariant.single}
                    aria-label={t("level3")}
                    isOpen={level3Open}
                    placeholderText={t("users-help:level3-ph")}
                    data-testid="select-level3"
                  >
                    {levelOptions(
                      level3(locations, valueFromRender2),
                      valueFromRender3
                    )}
                  </Select>
                );
              }}
            />
          </FormGroup>
        </fieldset>

        <fieldset className="border-top">
          <legend>
            <span className="text">{t("users:stamps")}</span>
          </legend>
          <FormGroup fieldId="kc-stamps">
            <Controller
              name="attributes"
              defaultValue=""
              render={({ field }) => {
                const valueFromRender = field.value[2];
                if (valueFromRender !== undefined) {
                  const value = `${Object.values(valueFromRender)[1]}`;
                  const stamps: string[] = value.split("##");
                  return (
                    <Grid hasGutter>
                      {stamps.map((attribute, index) => {
                        return (
                          <Fragment key={index}>
                            <GridItem span={6}>
                              <output key={index}>{attribute}</output>
                            </GridItem>
                          </Fragment>
                        );
                      })}
                    </Grid>
                  );
                } else return <output>buuuuuu</output>;
              }}
            />
          </FormGroup>
        </fieldset>
      </FormProvider>

      {!noSaveCancelButtons && (
        <ActionGroup className="kc-attributes__action-group">
          <Button
            data-testid="save-attributes"
            variant="primary"
            type="submit"
            isDisabled={!isDirty}
          >
            {t("common:save")}
          </Button>
          <Button onClick={reset} variant="link" isDisabled={!isDirty}>
            {t("common:revert")}
          </Button>
        </ActionGroup>
      )}
    </FormAccess>
  );
};
