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
  level0value,
  level1value,
  level2value,
  level3value,
  initLocations,
  ID_ZONES,
} from "../../context/cities/CitiesProvider";
import { useTranslation } from "react-i18next";
import { HelpItem } from "ui-shared";
import { Controller } from "react-hook-form";

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

let valueFromRender0: ZonesFieldRepresentation;
let valueFromRender1: ZonesFieldRepresentation;
let valueFromRender2: ZonesFieldRepresentation;
let valueFromRender3: ZonesFieldRepresentation;

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
            const fieldValue = field.value;
            if (
              typeof fieldValue !== "string" ||
              fieldValue.startsWith(ID_ZONES)
            )
              valueFromRender0 = level0value(field, locations);
            return (
              <Select
                toggleId="kc-level0"
                onToggle={() => {
                  setLevel0Open(!level0Open);
                }}
                onSelect={(_, value) => {
                  field.onChange(ID_ZONES + value);
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
            if (
              typeof fieldValue !== "string" ||
              fieldValue.startsWith(ID_ZONES)
            )
              valueFromRender1 = level1value(field, locations);
            return (
              <Select
                toggleId="kc-level1"
                onToggle={() => {
                  setLevel1Open(!level1Open);
                }}
                onSelect={(_, value) => {
                  field.onChange(ID_ZONES + value);
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
            if (
              typeof fieldValue !== "string" ||
              fieldValue.startsWith(ID_ZONES)
            )
              valueFromRender2 = level2value(field, locations);
            return (
              <Select
                toggleId="kc-level2"
                onToggle={() => {
                  setLevel2Open(!level2Open);
                }}
                onSelect={(_, value) => {
                  field.onChange(ID_ZONES + value);
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
            if (
              typeof fieldValue !== "string" ||
              fieldValue.startsWith(ID_ZONES)
            )
              valueFromRender3 = level3value(field, locations);
            return (
              <Select
                toggleId="kc-level3"
                onToggle={() => {
                  setLevel3Open(!level3Open);
                }}
                onSelect={(_, value) => {
                  field.onChange(ID_ZONES + value);
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
  );
};
