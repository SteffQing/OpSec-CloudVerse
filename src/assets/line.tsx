import { SVGProps } from "react";

export const Line_Tablet = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={1}
    height={241}
    viewBox="0 0 1 241"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line
      x1={0.5}
      y1={2.18557e-8}
      x2={0.499989}
      y2={241}
      stroke="#54597C"
      strokeDasharray="4 4"
    />
  </svg>
);

export const Line_Mobile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={343}
    height={1}
    viewBox="0 0 343 1"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line y1={0.5} x2={343} y2={0.5} stroke="#54597C" strokeDasharray="8 8" />
  </svg>
);
