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

import { FormAccess } from "../form/FormAccess";
import type { KeyValueType } from "./key-value-convert";
import { Cities } from "./Cities";
import { KeyValueInput } from "./KeyValueInput";
import { HelpItem } from "ui-shared";
import { useState, ReactElement, Fragment } from "react";
import {
  BlocksRepresentation,
  VotingPaperRepresentation,
  blocksLevel,
  initBlocks,
  ID_BLOCK,
  getDescription,
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

const blockOptions = (
  blocks: VotingPaperRepresentation[],
  value?: VotingPaperRepresentation
) => {
  const options: ReactElement[] = [];
  blocks.map((block: VotingPaperRepresentation) => {
    options.push(
      <SelectOption selected={block === value} value={block.id}>
        {block.name}
      </SelectOption>
    );
  });
  return options;
};

let stamps: string[] = [];
let blocks: BlocksRepresentation;

export const AttributesForm = ({
  form,
  reset,
  save,
  fineGrainedAccess,
}: AttributesFormProps) => {
  const { t } = useTranslation("roles");
  const noSaveCancelButtons = !save && !reset;
  const {
    formState: { isDirty },
    handleSubmit,
  } = form;
  const [blocksOpen, setBlocksOpen] = useState(false);
  let valueFromRender: VotingPaperRepresentation;
  blocks = initBlocks();

  return (
    <FormAccess
      role="manage-realm"
      onSubmit={save ? handleSubmit(save) : undefined}
      fineGrainedAccess={fineGrainedAccess}
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
              const blocksLevelV = blocksLevel(blocks);
              return (
                <Select
                  toggleId="kc-blocks"
                  onToggle={() => setBlocksOpen(!blocksOpen)}
                  onSelect={(_, value) => {
                    field.value[0] = { key: ID_BLOCK, value: value };
                    field.onChange(field.value);
                    setBlocksOpen(false);
                  }}
                  selections={getDescription(blocksLevelV, field)}
                  variant={SelectVariant.single}
                  aria-label={t("blocks")}
                  isOpen={blocksOpen}
                  placeholderText={t("users-help:blocks-ph")}
                  data-testid="select-blocks"
                >
                  {blockOptions(blocksLevelV, valueFromRender)}
                </Select>
              );
            }}
          />
        </FormGroup>

        <Cities />

        <fieldset className="border-top">
          <legend>
            <span className="text">{t("users:stamps")}</span>
          </legend>
          <FormGroup fieldId="kc-stamps">
            <Controller
              name="attributes"
              defaultValue=""
              render={({ field }) => {
                if (Array.isArray(field.value)) {
                  const valueFromRender = field.value[2];
                  if (valueFromRender !== undefined) {
                    const value = `${Object.values(valueFromRender)[1]}`;
                    stamps = value.split("##");
                  }
                }
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
