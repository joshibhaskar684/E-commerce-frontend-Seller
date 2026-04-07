
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

{ name: "Dashboard", href: "/admin"},
{ name: "Create Category", href: "/admin/category/create" },
{ name: "SubCategory", href: "/admin/category/subcategory/create?pageno=1&pagesize=12", },
// { name: "SubCategories", href: "/admin/category/subcategory", icon: FaTachometerAlt },
{ name: "Categories", href: "/admin/category?pageno=1&pagesize=12" },
{ name: "Update Category", href: "/admin/category/update" },
{ name: "Delete Category", href: "/admin/category/delete" },


{ name: "Create Products", href: "/admin/products/create"},

{ name: "Products", href: "/admin/products?pageno=1&pagesize=12"},


{ name: "lo Products", href: "/admin/products/create/lo"},


];