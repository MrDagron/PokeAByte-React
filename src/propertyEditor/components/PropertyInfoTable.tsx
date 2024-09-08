import React from "react";
import { useGamePropertyField } from "../hooks/useGamePropertyField";
import { clipboardCopy } from "../utils/clipboardCopy";
import { CopyValueIcon } from "./CopyValueIcon";
import { PropertyInputField } from "./PropertyInputField";
import { Store } from "../store/propertyStore";

export function PropertyInfoTable({ path }: { path: string }) {
  const type = useGamePropertyField(path, "type");
  const address = useGamePropertyField(path, "address");
  const length = useGamePropertyField(path, "length");
  const size = useGamePropertyField(path, "size");
  const reference = useGamePropertyField(path, "reference");

  return (
    <table>
      <tbody>
        <tr>
          <td>Value</td>
          <td><CopyValueIcon onClick={() => { }} /></td>
          <td><PropertyInputField path={path} /></td>
        </tr>
        <tr>
          <td>Path</td>
          <td><CopyValueIcon onClick={() => clipboardCopy(path)} /></td>
          <td>{path}</td>
        </tr>
        <tr>
          <td>Type</td>
          <td></td>
          <td>{type}</td>
        </tr>
        <tr>
          <td>Address</td>
          <td><CopyValueIcon onClick={() => clipboardCopy(address?.toString())} /></td>
          <td>{address?.toString(16).toUpperCase()}</td>
        </tr>
        <tr>
          <td>Length</td>
          <td></td>
          <td>{length}</td>
        </tr>
        <tr>
          <td>Size</td>
          <td></td>
          <td>{size}</td>
        </tr>
        <tr>
          <td>Reference</td>
          <td><CopyValueIcon onClick={() => clipboardCopy(reference)} /></td>
          <td>{reference}</td>
        </tr>
        <PropertyByteRow  path={path}/>
      </tbody>
    </table>
  );
}

export function PropertyByteRow({ path }: { path: string }) {
  const type = useGamePropertyField(path, "type");
  const bytes = useGamePropertyField(path, "bytes");
  if (!bytes) {
    return null;
  }
  const terminator = Store.client.getGlossary().defaultCharacterMap[0].key;
  let byteStrings = bytes?.map(x => x.toString(16).padStart(2, "0").toUpperCase());
  if (type === "string") {  
    var terminatorIndex = bytes?.indexOf(terminator);
    byteStrings = byteStrings?.map((byte, index) => index > terminatorIndex ? "" : byte);
  }

  return (
    <tr>
      <td>Bytes</td>
      <td><CopyValueIcon onClick={() => clipboardCopy(bytes?.join(""))} /></td>
      <td>
        {byteStrings?.map((byte, i) => {
          return (
            <React.Fragment key={i}>
              <input type="text" value={byte} maxLength={4} style={{width: "1.5em", marginLeft: "0.5em"}}/>
            </React.Fragment>
          );
        })}
      </td>
    </tr>
  );
}