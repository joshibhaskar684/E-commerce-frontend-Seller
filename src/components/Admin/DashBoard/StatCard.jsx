import { formatLabel, getIcon } from "./utils/Utility";

const StatCard = ({ label, value }) => {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background text-foreground shadow-sm transition-all hover:shadow-md">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {formatLabel(label)}
        </h3>
        <div className="text-zinc-400 dark:text-zinc-500 flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4">
          {getIcon(label)}
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
};

export default StatCard;