import type { SVGProps } from "react";

export const DharmaWheel = (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 21a9 9 0 0 0 9-9" />
      <path d="M3 12a9 9 0 0 1 9-9" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M12 3v2" />
      <path d="M12 19v2" />
      <path d="M20.66 12l-2 0" />
      <path d="M5.34 12l-2 0" />
      <path d="M17.65 6.35-1.41 1.41" />
      <path d="M7.76 16.24-1.41 1.41" />
      <path d="M17.65 17.65-1.41-1.41" />
      <path d="M7.76 7.76-1.41-1.41" />
    </svg>
  );
  