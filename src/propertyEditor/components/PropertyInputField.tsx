import { GameProperty } from "pokeaclient";
import React from "react";
import { Store } from "../store/propertyStore";
import { SaveValueButton } from "./SaveValueButton";
import { FreezeValueButton } from "./FreezeValueButton";


export function getPropertyFieldValue(property: GameProperty) {
  if (property.type === "bitArray") {
    return property.value.map((x: boolean) => x ? "1" : "0").join("") ?? "";
  }
  return property.value;
}

export function PropertyInputField({ property }: { property: GameProperty }) {
  let type = property.type === "bit" || property.type === "bool" ? "checkbox" : "text";
  const propertyValue = getPropertyFieldValue(property) ?? "";
  const [value, setValue] = React.useState(propertyValue);
  const [hasFocus, setHasFocus] = React.useState(false);
  const [madeEdit, setMadeEdit] = React.useState(false);
  const handleSave = async () => {
    await Store.client.updatePropertyValue(property.path, value);
    setMadeEdit(false);
  }
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
