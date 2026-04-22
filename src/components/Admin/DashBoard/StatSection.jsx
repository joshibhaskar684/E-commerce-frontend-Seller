import StatCard from "./StatCard";

const StatSection = ({ title, data }) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-foreground mb-5 tracking-tight">
        {title}
      </h2>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {Object.entries(data).map(([key, value], i) => (
          <StatCard key={key} label={key} value={value} index={i} />
        ))}
      </div>
    </div>
  );
};

export default StatSection;