
import {
  FaTachometerAlt,
  FaUsers,
  FaCertificate,
  FaUserShield,
  FaBook,
  FaGraduationCap,
  FaBriefcase,
  FaClipboardList,
  FaClipboardCheck,
  FaTasks,
  FaCheckCircle,
  FaTags,
  FaCog,
  FaBars
} from "react-icons/fa";

export const menuItems = [

{ name: "Dashboard", href: "/admin", icon: FaTachometerAlt },
{ name: "Create Category", href: "/admin/category/create", icon: FaTachometerAlt },
{ name: "SubCategory", href: "/admin/category/subcategory/create?pageno=1&pagesize=12", icon: FaTachometerAlt },
// { name: "SubCategories", href: "/admin/category/subcategory", icon: FaTachometerAlt },
{ name: "Categories", href: "/admin/category?pageno=1&pagesize=12", icon: FaTachometerAlt },
{ name: "Update Category", href: "/admin/category/update", icon: FaTachometerAlt },
{ name: "Delete Category", href: "/admin/category/delete", icon: FaTachometerAlt },


{ name: "Create Products", href: "/admin/products/create", icon: FaTachometerAlt },

{ name: "Products", href: "/admin/products/create", icon: FaTachometerAlt },


{ name: "Create Products", href: "/admin/products/create", icon: FaTachometerAlt },


];