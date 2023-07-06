import type RoleRepresentation from "@keycloak/keycloak-admin-client/lib/defs/roleRepresentation";
import {
  ActionGroup,
  Button,
  FormGroup,
  Select,
  SelectOption,
  SelectVariant,
} from "@patternfly/react-core";
import { FormProvider, UseFormReturn, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormAccess } from "../form-access/FormAccess";
import type { KeyValueType } from "./key-value-convert";
import { KeyValueInput } from "./KeyValueInput";
import { HelpItem } from "ui-shared";
import { useState } from "react";
import {
  level0,
  level1,
  level2,
  level3,
  initLocations,
} from "../../context/cities/CitiesProvider";

export type AttributeForm = Omit<RoleRepresentation, "attributes"> & {
  attributes?: KeyValueType[];
};

export type AttributesFormProps = {
  form: UseFormReturn<AttributeForm>;
  save?: (model: AttributeForm) => void;
  reset?: () => void;
  fineGrainedAccess?: boolean;
};

const level0options = (value: string) => {
  let level0options = "";
  level0.map((idx, location) => {
    level0options += (
      <SelectOption
        selected={location.name === value}
        key={`level0-${idx}`}
        value={location.name}
      >
        {t(`${location.name}`)}
      </SelectOption>
    );
  });
  return level0options;
};

const level1options = (value: string) => {
  let level1options = "";
  level1.map((idx, location) => {
    level1options += (
      <SelectOption
        selected={location.name === value}
        key={`level1-${idx}`}
        value={location.name}
      >
        {t(`${location.name}`)}
      </SelectOption>
    );
  });
  return level1options;
};

const level2options = (value: string) => {
  let level2options = "";
  level2.map((idx, location) => {
    level2options += (
      <SelectOption
        selected={location.name === value}
        key={`level2-${idx}`}
        value={location.name}
      >
        {t(`${location.name}`)}
      </SelectOption>
    );
  });
  return level2options;
};

const level3options = (value: string) => {
  let level3options = "";
  level3.map((idx, location) => {
    level3options += (
      <SelectOption
        selected={location.name === value}
        key={`level3-${idx}`}
        value={location.name}
      >
        {t(`${location.name}`)}
      </SelectOption>
    );
  });
  return level3options;
};

const { t } = useTranslation("roles");

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
  initLocations();

  return (
    <FormAccess
      role="manage-realm"
      onSubmit={save ? handleSubmit(save) : undefined}
      fineGrainedAccess={fineGrainedAccess}
      className="pf-u-mt-lg"
    >
      <FormProvider {...form}>
        <KeyValueInput name="attributes" />
      </FormProvider>
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
          name="level0"
          defaultValue=""
          render={({ field }) => (
            <Select
              toggleId="kc-level0-theme"
              onToggle={() => setLevel0Open(!level0Open)}
              onSelect={(_, value) => {
                field.onChange(value as string);
                setLevel0Open(false);
              }}
              selections={field.value}
              variant={SelectVariant.single}
              aria-label={t("level0")}
              isOpen={level0Open}
              placeholderText="Select a theme"
              data-testid="select-level0"
            >
              {level0options(field.value)}
            </Select>
          )}
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
          name="level1"
          defaultValue=""
          render={({ field }) => (
            <Select
              toggleId="kc-account-theme"
              onToggle={() => setLevel1Open(!level1Open)}
              onSelect={(_, value) => {
                field.onChange(value as string);
                setLevel1Open(false);
              }}
              selections={field.value}
              variant={SelectVariant.single}
              aria-label={t("level1")}
              isOpen={level1Open}
              placeholderText="Select a theme"
              data-testid="select-level1"
            >
              {level1options(field.value)}
            </Select>
          )}
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
          name="level2"
          defaultValue=""
          render={({ field }) => (
            <Select
              toggleId="kc-level2"
              onToggle={() => setLevel2Open(!level2Open)}
              onSelect={(_, value) => {
                field.onChange(value as string);
                setLevel2Open(false);
              }}
              selections={field.value}
              variant={SelectVariant.single}
              aria-label={t("level2")}
              isOpen={level2Open}
              placeholderText="Select a theme"
              data-testid="select-level2"
            >
              {level2options(field.value)}
            </Select>
          )}
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
          name="level3"
          defaultValue=""
          render={({ field }) => (
            <Select
              toggleId="kc-level3"
              onToggle={() => setLevel3Open(!level3Open)}
              onSelect={(_, value) => {
                field.onChange(value as string);
                setLevel3Open(false);
              }}
              selections={field.value}
              variant={SelectVariant.single}
              aria-label={t("level3")}
              isOpen={level3Open}
              placeholderText="Select a theme"
              data-testid="select-level3"
            >
              {level3options(field.value)}
            </Select>
          )}
        />
      </FormGroup>
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
