import {
  FaUsers,
  FaStore,
  FaUserCheck,
  FaUserTimes,
  FaBan,
  FaClock,
} from "react-icons/fa";

export const formatLabel = (key) =>
  key
    .replace(/total/gi, "")
    .replace(/([A-Z])/g, " $1")
    .trim();

export const getIcon = (key) => {
  if (key.toLowerCase().includes("user")) return <FaUsers />;
  if (key.toLowerCase().includes("shop")) return <FaStore />;
  if (key.toLowerCase().includes("approved")) return <FaUserCheck />;
  if (key.toLowerCase().includes("rejected")) return <FaUserTimes />;
  if (key.toLowerCase().includes("suspended")) return <FaBan />;
  if (key.toLowerCase().includes("inactive")) return <FaClock />;
  return <FaUsers />;
};