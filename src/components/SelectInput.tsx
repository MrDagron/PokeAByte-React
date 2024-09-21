import React, { FocusEvent } from "react";

type SelectOption<V> = { value: V, display: string }

interface SelectInputProps<T extends SelectOption<any>>   {
  id: string,
  label: string,
  value?: T["value"],
  options: T[],
  onSelection: (value: T["value"]) => void,
}

function matchDisplayvalue(search: string) {
  return (option: SelectOption<any>) => {
    if (!search) {
      return true;
    }
    return option.display.toLowerCase().includes(search);
  }
}

function findDisplayByValue<V, T extends SelectOption<V>>(options: T[], value?: V) {
  if (!value) {
    return "";
  }
  return options.find(x => x.value === value)?.display ?? "";
}

export function SelectInput<Value>(props: SelectInputProps<SelectOption<Value>>){
  const [isFocused, setFocused] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const valueDisplay = findDisplayByValue(props.options, props.value);
  
  const handleSelection = (option: Value) => {
    console.log(option);
    props.onSelection(option);
    setFocused(false);
    setSearchValue(findDisplayByValue(props.options, option));
  }
  const handleOnFocus = (event: FocusEvent<HTMLInputElement>) => {
    event.target.select();
    setFocused(true);
  }

  return (
    <div>
      <label htmlFor={props.id}>
        {props.label}
      </label>
      <input 
        name={props.id} 
        value={isFocused ? searchValue : (valueDisplay ?? "")}
        onFocus={handleOnFocus}
        onBlur={() => setFocused(true)}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {isFocused && 
        <li>
          {props.options.filter(matchDisplayvalue(searchValue)).map((x, index) => 
            <ul key={index} onClick={() => handleSelection(x.value)}>
              {x.display}
            </ul>
          )} 
        </li>
      }
    </div>
  )
}