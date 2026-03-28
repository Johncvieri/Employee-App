import type { Gender } from "../../types/Employee";

export const Badge = ({ gender }: { gender: Gender }) => {
  return (
    <span className="px-2 py-1 bg-gray-200 rounded text-sm">
      {gender === "MALE" ? "Male" : "Female"}
    </span>
  );
};