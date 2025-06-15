import { FaCat } from "react-icons/fa";

interface PlaceholderProps{
    text?: string
}

export default function Placeholder({text}:PlaceholderProps) {
  return (
    <div className="h-[500px] flex flex-col gap-5 items-center justify-center text-center p-6 text-muted-foreground">
      <FaCat size={50} style={{ color: 'var(--icon-color)' }}/>
      <p className="text-lg font-normal" style={{ color: "var(--placeholder-text)"}}>{text ? text : "Nada por aqui ainda"}</p>
    </div>
  );
}