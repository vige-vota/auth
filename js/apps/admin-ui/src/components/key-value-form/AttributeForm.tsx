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
import { useCities } from "../../context/cities/CitiesProvider";

export type AttributeForm = Omit<RoleRepresentation, "attributes"> & {
  attributes?: KeyValueType[];
};

export type AttributesFormProps = {
  form: UseFormReturn<AttributeForm>;
  save?: (model: AttributeForm) => void;
  reset?: () => void;
  fineGrainedAccess?: boolean;
};

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
  const [circumscriptionsOpen, setCircumscriptionsOpen] = useState(false);
  const [regionsOpen, setRegionsOpen] = useState(false);
  const [provincesOpen, setProvincesOpen] = useState(false);
  const [citiesOpen, setCitiesOpen] = useState(false);
  const locations = useCities().nodes!;

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
        label={t("circumscriptions")}
        fieldId="kc-circumscriptions"
        labelIcon={
          <HelpItem
            helpText={t("users-help:circumscriptions")}
            fieldLabelId="users:circumscriptions"
          />
        }
      >
        <Controller
          name="circumscriptions"
          defaultValue=""
          render={({ field }) => (
            <Select
              toggleId="kc-circumscriptions-theme"
              onToggle={() => setCircumscriptionsOpen(!circumscriptionsOpen)}
              onSelect={(_, value) => {
                field.onChange(value as string);
                setCircumscriptionsOpen(false);
              }}
              selections={field.value}
              variant={SelectVariant.single}
              aria-label={t("circumscriptions")}
              isOpen={circumscriptionsOpen}
              placeholderText="Select a theme"
              data-testid="select-circumscriptions"
            >
              {locations.circumscriptions.map((circumscription, idx) => (
                <SelectOption
                  selected={circumscription.name === field.value}
                  key={`circumscriptions-${idx}`}
                  value={circumscription.name}
                >
                  {t(`${circumscription.name}`)}
                </SelectOption>
              ))}
            </Select>
          )}
        />
      </FormGroup>
      <FormGroup
        label={t("regions")}
        fieldId="kc-regions"
        labelIcon={
          <HelpItem
            helpText={t("users-help:regions")}
            fieldLabelId="users:regions"
          />
        }
      >
        <Controller
          name="regions"
          defaultValue=""
          render={({ field }) => (
            <Select
              toggleId="kc-account-theme"
              onToggle={() => setRegionsOpen(!regionsOpen)}
              onSelect={(_, value) => {
                field.onChange(value as string);
                setRegionsOpen(false);
              }}
              selections={field.value}
              variant={SelectVariant.single}
              aria-label={t("regions")}
              isOpen={regionsOpen}
              placeholderText="Select a theme"
              data-testid="select-regions"
            >
              {locations.regions.map((region, idx) => (
                <SelectOption
                  selected={region.name === field.value}
                  key={`regions-${idx}`}
                  value={region.name}
                >
                  {t(`${region.name}`)}
                </SelectOption>
              ))}
            </Select>
          )}
        />
      </FormGroup>
      <FormGroup
        label={t("provinces")}
        fieldId="kc-provinces"
        labelIcon={
          <HelpItem
            helpText={t("users-help:provinces")}
            fieldLabelId="users:provinces"
          />
        }
      >
        <Controller
          name="provinces"
          defaultValue=""
          render={({ field }) => (
            <Select
              toggleId="kc-provinces"
              onToggle={() => setProvincesOpen(!provincesOpen)}
              onSelect={(_, value) => {
                field.onChange(value as string);
                setProvincesOpen(false);
              }}
              selections={field.value}
              variant={SelectVariant.single}
              aria-label={t("provinces")}
              isOpen={provincesOpen}
              placeholderText="Select a theme"
              data-testid="select-provinces"
            >
              {locations.provinces.map((province, idx) => (
                <SelectOption
                  selected={province.name === field.value}
                  key={`provinces-${idx}`}
                  value={province.name}
                >
                  {t(`${province.name}`)}
                </SelectOption>
              ))}
            </Select>
          )}
        />
      </FormGroup>
      <FormGroup
        label={t("cities")}
        fieldId="kc-cities"
        labelIcon={
          <HelpItem
            helpText={t("users-help:cities")}
            fieldLabelId="users:cities"
          />
        }
      >
        <Controller
          name="cities"
          defaultValue=""
          render={({ field }) => (
            <Select
              toggleId="kc-cities"
              onToggle={() => setCitiesOpen(!citiesOpen)}
              onSelect={(_, value) => {
                field.onChange(value as string);
                setCitiesOpen(false);
              }}
              selections={field.value}
              variant={SelectVariant.single}
              aria-label={t("cities")}
              isOpen={citiesOpen}
              placeholderText="Select a theme"
              data-testid="select-cities"
            >
              {locations.cities.map((city, idx) => (
                <SelectOption
                  selected={city.name === field.value}
                  key={`cities-${idx}`}
                  value={city.name}
                >
                  {t(`${city.name}`)}
                </SelectOption>
              ))}
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
