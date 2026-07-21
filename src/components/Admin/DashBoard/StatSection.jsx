import StatCard from "./StatCard";

const StatSection = ({ title, data }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold tracking-tight text-foreground mb-4">
        {title}
      </h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Object.entries(data).map(([key, value]) => (
          <StatCard key={key} label={key} value={value} />
        ))}
      </div>
    </div>
  );
};

export default StatSection;