import { GameProperty } from "pokeaclient";
import React, { useCallback } from "react";
import { Store } from "../store/propertyStore";
import { SaveValueButton } from "./SaveValueButton";
import { FreezeValueButton } from "./FreezeValueButton";
import { useGameProperty } from "../hooks/useGameProperty";
import { Toasts } from "../../notifications/ToastStore";


export function getPropertyFieldValue(property: GameProperty) {
  if (property.type === "bitArray") {
    return property.value.map((x: boolean) => x ? "1" : "0").join("") ?? "";
  }
  return property.value;
}

export function PropertyInputField({ path }: { path: string }) {
  var property = useGameProperty(path);
  if (property === null) {
    return null;
  }
  let type = property.type === "bit" || property.type === "bool" ? "checkbox" : "text";
  const propertyValue = getPropertyFieldValue(property) ?? "";
  const [value, setValue] = React.useState(propertyValue);
  const [hasFocus, setHasFocus] = React.useState(false);
  const [madeEdit, setMadeEdit] = React.useState(false);
  const handleSave = useCallback(
    () => {
      if (property?.path) {
        Store.client.updatePropertyValue(property.path, value)
          .then(() => {
            setMadeEdit(false);
            Toasts.push(`Saved successful`, "task_alt", "succcess");
        });
      }
    },
    [property.path]
  );
  return (
    <>
      <input
        type={type}
        value={(hasFocus || madeEdit) ? value : propertyValue}
        onFocus={() => { setHasFocus(true); setValue(propertyValue); }}
        onBlur={() => setHasFocus(false)}
        onChange={(e) => { setValue(e.currentTarget.value); setMadeEdit(true) }}
      />
      <SaveValueButton value={value} active={madeEdit} onClick={handleSave} />
      <FreezeValueButton isFrozen={property.isFrozen} path={property.path} />
    </>
  )
}
