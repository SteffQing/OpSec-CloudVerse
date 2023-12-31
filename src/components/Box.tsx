import { cn } from "../lib/utils";

interface BoxWrapperProps {
  children: React.ReactNode;
  title: string;
  width?: string;
  textAlign?: string;
}

export default function BoxWrapper(props: BoxWrapperProps) {
  const { children, title, width, textAlign } = props;

  return (
    <div
      className={cn(
        "border border-[#1D202D] bg-[#0E111C] rounded-2xl max-w-[900px] m-auto w-full mt-20 md:mt-32 px-6 md:px-8",
        width
      )}
    >
      <h2 className={cn("my-4 text-2xl text-center", textAlign)}>{title}</h2>
      {children}
    </div>
  );
}
