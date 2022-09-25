import { parseISO, format } from "date-fns";
import { HTMLProps } from "react";

interface props extends HTMLProps<HTMLTimeElement> {
  dateString: string;
}

export default function Date({ dateString, className }: props) {
  const date = parseISO(dateString);
  return (
    <time className={" " + className} dateTime={dateString}>
      {format(date, "LLLL d, yyyy")}
    </time>
  );
}
