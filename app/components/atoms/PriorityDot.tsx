import { Priority } from "@prisma/client";

export const PriorityDot = ({ priority }) => {
  let color;
  // switch on priority status
  switch (priority) {
    case Priority.LOW:
      color = "bg-green-500";
      break;
    case Priority.MEDIUM:
      color = "bg-yellow-500";
      break;
    case Priority.HIGH:
      color = "bg-red-500";
      break;
    default:
      color = "bg-gray-500";
      break;
  }

  return <div className={`w-5 h-5 rounded-full ${color}`}></div>;
};
