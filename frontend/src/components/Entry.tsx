import { IconType } from "react-icons";
import DefaultLoader from "./DefaultLoader";

export default function Entry({
  title,
  value,
  icon: Icon,
  unit,
  ...props
}: {
  title: string;
  value: number | null;
  icon?: IconType;
  unit?: string;
}) {
  if (!value) return <DefaultLoader />;

  return (
    <div className="flex p-5">
      <p className="m-auto ml-0">{title}</p>
      <p className="m-auto mr-1">
        {parseFloat(value.toFixed(2))}
        {unit}
      </p>
      {Icon && <Icon className="m-0 mt-auto mb-auto w-5 h-5" />}
    </div>
  );
}
