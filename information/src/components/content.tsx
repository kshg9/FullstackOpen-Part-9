import { CoursePart } from "../types";
import Part from "./part";

const Content = ({ parts }: { parts: CoursePart[] }) => (
  <div>
    {parts.map((part, index) => (
      <Part key={index} part={part} />
    ))}
  </div>
);

export default Content;
