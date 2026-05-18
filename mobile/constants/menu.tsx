import { Home, User, Info, LogOut } from "lucide-react-native";
import type { SidebarItem } from "~/components/Sidebar";

export const MAIN_MENU: SidebarItem[] = [
  {
    label: "Feed",
    href: "/home/feed",
    icon: <Home size={18} color="#111" />,
  },
  {
    label: "Perfil",
    href: "/profile/perfil",
    icon: <User size={18} color="#111" />,
  },
  {
    label: "Detalhes",
    href: "/details",
    icon: <Info size={18} color="#111" />,
  },
  {
    label: "Logout",
    href: "/login",
    icon: <LogOut size={18} color="#111" />,
  },
];
