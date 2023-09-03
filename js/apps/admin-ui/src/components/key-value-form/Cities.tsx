import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant,
} from "@patternfly/react-core";
import { useState, ReactElement } from "react";
import {
  ZonesFieldRepresentation,
  level0,
  level1,
  level2,
  level3,
  initLocations,
  ID_ZONES,
  getId,
  getDescription,
} from "../../context/cities/CitiesProvider";
import { useTranslation } from "react-i18next";
import { HelpItem } from "ui-shared";
import { Controller } from "react-hook-form";

const levelOptions = (locations: ZonesFieldRepresentation[], value: string) => {
  const options: ReactElement[] = [];
  locations.map((location: ZonesFieldRepresentation) => {
    options.push(
      <SelectOption
        selected={location.id === getId(value, location.level)}
        value={location.id}
      >
        {location.name}
      </SelectOption>
    );
  });
  return options;
};

export const Cities = () => {
  const [level0Open, setLevel0Open] = useState(false);
  const [level1Open, setLevel1Open] = useState(false);
  const [level2Open, setLevel2Open] = useState(false);
  const [level3Open, setLevel3Open] = useState(false);
  const locations = initLocations();
  const { t } = useTranslation("users");

  return (
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
            const levelOptionsV = level0(locations);
            const id = getId(field, 0);
            return (
              <Select
                toggleId="kc-level0"
                onToggle={() => {
                  setLevel0Open(!level0Open);
                }}
                onSelect={(_, value) => {
                  field.value[1] = { key: ID_ZONES, value: value };
                  field.onChange(field.value);
                  setLevel0Open(false);
                }}
                selections={getDescription(levelOptionsV, id)}
                variant={SelectVariant.single}
                aria-label={t("level0")}
                isOpen={level0Open}
                placeholderText={t("users-help:level0-ph")}
                data-testid="select-level0"
              >
                {levelOptions(levelOptionsV, id)}
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
            const levelOptionsV = level1(locations, field);
            const id = getId(field, 1);
            return (
              <Select
                toggleId="kc-level1"
                onToggle={() => {
                  setLevel1Open(!level1Open);
                }}
                onSelect={(_, value) => {
                  field.value[1] = { key: ID_ZONES, value: value };
                  field.onChange(field.value);
                  setLevel1Open(false);
                }}
                selections={getDescription(levelOptionsV, id)}
                variant={SelectVariant.single}
                aria-label={t("level1")}
                isOpen={level1Open}
                placeholderText={t("users-help:level1-ph")}
                data-testid="select-level1"
              >
                {levelOptions(levelOptionsV, id)}
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
            const levelOptionsV = level2(locations, field);
            const id = getId(field, 2);
            return (
              <Select
                toggleId="kc-level2"
                onToggle={() => {
                  setLevel2Open(!level2Open);
                }}
                onSelect={(_, value) => {
                  field.value[1] = { key: ID_ZONES, value: value };
                  field.onChange(field.value);
                  setLevel2Open(false);
                }}
                selections={getDescription(levelOptionsV, id)}
                variant={SelectVariant.single}
                aria-label={t("level2")}
                isOpen={level2Open}
                placeholderText={t("users-help:level2-ph")}
                data-testid="select-level2"
              >
                {levelOptions(levelOptionsV, id)}
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
            const levelOptionsV = level3(locations, field);
            const id = getId(field, 3);
            return (
              <Select
                toggleId="kc-level3"
                onToggle={() => {
                  setLevel3Open(!level3Open);
                }}
                onSelect={(_, value) => {
                  field.value[1] = { key: ID_ZONES, value: value };
                  field.onChange(field.value);
                  setLevel3Open(false);
                }}
                selections={getDescription(levelOptionsV, id)}
                variant={SelectVariant.single}
                aria-label={t("level3")}
                isOpen={level3Open}
                placeholderText={t("users-help:level3-ph")}
                data-testid="select-level3"
              >
                {levelOptions(levelOptionsV, id)}
              </Select>
            );
          }}
        />
      </FormGroup>
    </fieldset>
  );
};
