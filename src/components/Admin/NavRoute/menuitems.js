
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

{ name: "Approved Sellers", href: "/admin/sellers?pageno=1&pagesize=12"},

{ name: "Unapproved Sellers", href: "/admin/sellers/request?pageno=1&pagesize=12"},

{ name: "Rejected Sellers", href: "/admin/sellers/rejected?pageno=1&pagesize=12"},

{ name: "Suspended Sellers", href: "/admin/sellers/suspended?pageno=1&pagesize=12"},


{ name: "Approved Shop", href: "/admin/shop?pageno=1&pagesize=12"},

{ name: "Unapproved Shop", href: "/admin/shop/request?pageno=1&pagesize=12"},

{ name: "Rejected Shop", href: "/admin/shop/rejected?pageno=1&pagesize=12"},

{ name: "Suspended Shop", href: "/admin/shop/suspended?pageno=1&pagesize=12"},

{ name: "Users", href: "/admin/users?pageno=1&pagesize=12"},


];