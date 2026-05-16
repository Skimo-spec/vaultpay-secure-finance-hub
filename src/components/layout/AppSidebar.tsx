import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Send,
  CreditCard,
  Shield,
  Bell,
  Settings,
  Palette,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Send money", url: "/transfer", icon: Send },
  { title: "Cards", url: "/cards", icon: CreditCard },
  { title: "Security", url: "/security", icon: Shield },
  { title: "Notifications", url: "/notifications", icon: Bell },
];

const secondaryNav = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Design system", url: "/design-system", icon: Palette },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="font-display text-lg font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
            VaultPay
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Banking</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2 group-data-[collapsible=icon]:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary text-sm font-semibold text-white">
            AM
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">Alex Morgan</div>
            <div className="truncate text-xs text-muted-foreground">VaultPay Plus</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
