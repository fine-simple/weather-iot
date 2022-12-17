import { IconType } from "react-icons";

export default function Entry({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon?: IconType;
}) {
  return (
    <div className="flex p-5">
      <p className="m-auto ml-0">{title}</p>
      <p className="m-auto mr-1">{value}</p>
      {Icon && <Icon className="m-0 mt-auto mb-auto w-5 h-5" />}
    </div>
  );
}
