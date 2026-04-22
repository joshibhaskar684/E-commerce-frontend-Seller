import { formatLabel, getIcon } from "./utils/Utility";


const StatCard = ({ label, value, index }) => {
  const gradients = [
    "from-yellow-400/20 to-yellow-600/20",
    "from-indigo-400/20 to-indigo-600/20",
    "from-green-400/20 to-green-600/20",
    "from-red-400/20 to-red-600/20",
    "from-purple-400/20 to-purple-600/20",
  ];

  return (
    <div
      className={`relative group rounded-2xl p-[1px] bg-gradient-to-br ${
        gradients[index % gradients.length]
      }`}
    >
      {/* Glass Card */}
      <div
        className="rounded-2xl p-5 backdrop-blur-xl bg-white/70 
        border border-white/40 shadow-sm
        transition-all duration-300
        group-hover:shadow-xl group-hover:-translate-y-1"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-yellow-400/10 to-transparent"></div>

        <div className="flex items-center justify-between">
          <div className="text-gray-600 text-sm">
            {formatLabel(label)}
          </div>

          <div className="text-lg text-gray-400 group-hover:text-yellow-500 transition">
            {getIcon(label)}
          </div>
        </div>

        <div className="mt-3 text-3xl font-bold text-gray-800">
          {value}
        </div>

        {/* subtle divider */}
        <div className="mt-3 h-[2px] w-10 bg-gradient-to-r from-yellow-400 to-transparent rounded-full"></div>
      </div>
    </div>
  );
};

export default StatCard;