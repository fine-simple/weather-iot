import { useId } from "react";

export default function Input({
  label,
  name,
  disabled,
  onChange,
  value,
}: {
  label: string;
  name: string;
  disabled?: boolean;
  onChange: React.ChangeEventHandler;
  value: string | number;
}) {
  const id = useId();
  return (
    <div className="pb-3 w-full">
      <label htmlFor={id}>{label}:</label> <br />
      <textarea
        onChange={onChange}
        value={value}
        name={name}
        className="rounded-md bg-slate-400 text-black px-2 w-3/4 lg:w-full"
        id={id}
        disabled={disabled || false}
      />
    </div>
  );
}
