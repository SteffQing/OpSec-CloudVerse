import { cn } from "@/lib/utils";

interface Props {
  text: string;
  className?: string;
}

export default function Placeholder(props: Props) {
  const { text, className } = props;
  return (
    <main
      className={cn("px-4 md:px-6 pt-44 md:pt-24 relative h-[50vh]", className)}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl text-center">
        {text}
      </div>
    </main>
  );
}
