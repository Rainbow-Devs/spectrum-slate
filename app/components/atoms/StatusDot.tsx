export const StatusDot = ({ status }) => {
  let color;

  switch (status) {
    case 'low':
      color = 'bg-green-500';
      break;
    case 'medium':
      color = 'bg-yellow-500';
      break;
    case 'high':
      color = 'bg-orange-500';
      break;
    case 'urgent':
      color = 'bg-red-500';
      break;
    default:
      color = 'bg-gray-400';
  }

  return <div className={`w-5 h-5 rounded-full ${color}`}></div>;
};
