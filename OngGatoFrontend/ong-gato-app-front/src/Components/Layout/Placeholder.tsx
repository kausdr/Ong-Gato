import { FaCat } from "react-icons/fa";

interface PlaceholderProps{
    text?: string
}

export default function Placeholder({text}:PlaceholderProps) {
  return (
    <div className="h-[500px] flex flex-col gap-5 items-center justify-center text-center p-6 text-muted-foreground">
      <FaCat className="text-blue-300" size={50} />
      <p className="text-lg font-normal text-slate-400">{text ? text : "Nada por aqui ainda"}</p>
    </div>
  );
}
