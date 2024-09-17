type ButtonProps = {label: string, onClick?: () => void}

export function Button(props: ButtonProps) {
  return (
    <button type="button" onClick={props.onClick}>
      {props.label}
    </button>
  )
}