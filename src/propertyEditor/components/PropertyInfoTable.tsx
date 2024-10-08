import { useGamePropertyField } from "../hooks/useGamePropertyField";
import { clipboardCopy } from "../utils/clipboardCopy";
import { CopyValueIcon } from "./CopyValueIcon";
import { PropertyInputField } from "./PropertyInputField";

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
          <td>{address}</td>
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
  const bytes = useGamePropertyField(path, "bytes");
  return (
    <tr>
      <td>Bytes</td>
      <td><CopyValueIcon onClick={() => clipboardCopy(bytes?.join(""))} /></td>
      <td>{bytes}</td>
    </tr>
  );
}