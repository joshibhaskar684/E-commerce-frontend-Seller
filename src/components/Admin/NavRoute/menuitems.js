
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
// { name: "Create Category", href: "/admin/category/create" },
// { name: "SubCategory", href: "/admin/category/subcategory/create?pageno=1&pagesize=12", },
// { name: "SubCategories", href: "/admin/category/subcategory", icon: FaTachometerAlt },
{ name: "Categories", href: "/admin/category?pageno=1&pagesize=12" },
// { name: "Update Category", href: "/admin/category/update" },
// { name: "Delete Category", href: "/admin/category/delete" },


// { name: "Create Products", href: "/admin/products/create"},

{ name: "Products", href: "/admin/products?pageno=1&pagesize=12"},

// Approved / pending / rejected / suspended sellers are tabs on this one
// screen now — the old per status routes redirect to it.
{ name: "Sellers", href: "/admin/sellers?pageno=1&pagesize=12"},


// Same story for shops: approved / pending / rejected / suspended are tabs.
{ name: "Shops", href: "/admin/shop?pageno=1&pagesize=12"},

{ name: "Users", href: "/admin/users?pageno=1&pagesize=12"},

];