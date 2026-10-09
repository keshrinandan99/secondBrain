import React from "react";
import {
  FileText,
  Image as ImageIcon,
  Link2,
  Type,
  Hash,
  LayoutGrid,
} from "lucide-react";
import { BrainIcon, YoutubeIcon, TwitterIcon } from "./icons";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar";

export type SidebarFilterType =
  | "all"
  | "twitter"
  | "youtube"
  | "article"
  | "image"
  | "text"
  | "link"
  | "tags";

interface AppSidebarProps {
  selectedType?: SidebarFilterType | string;
  onSelectType?: (type: SidebarFilterType) => void;
  className?: string;
}

export interface SidebarItemConfig {
  id: SidebarFilterType;
  title: string;
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
}

export const SIDEBAR_ITEMS: SidebarItemConfig[] = [
  {
    id: "all",
    title: "All Content",
    icon: LayoutGrid,
  },
  {
    id: "twitter",
    title: "Tweets",
    icon: TwitterIcon,
  },
  {
    id: "youtube",
    title: "Videos",
    icon: YoutubeIcon,
  },
  {
    id: "article",
    title: "Documents",
    icon: FileText,
  },
  {
    id: "image",
    title: "Images",
    icon: ImageIcon,
  },
  {
    id: "text",
    title: "Notes",
    icon: Type,
  },
  {
    id: "link",
    title: "Links",
    icon: Link2,
  },
  {
    id: "tags",
    title: "Tags",
    icon: Hash,
  },
];

export function AppSidebar({
  selectedType = "all",
  onSelectType,
  className,
}: AppSidebarProps) {
  return (
    <Sidebar
      collapsible="none"
      className={`border-r border-border/70 bg-card text-card-foreground min-h-screen w-64 md:w-72 select-none ${className || ""}`}
    >
      {/* Header with Brain Logo & Title */}
      <SidebarHeader className="px-6 py-6 pb-4">
        <div className="flex items-center gap-3.5 group cursor-pointer">
          <div className="flex items-center justify-center text-indigo-600 transition-transform duration-200 group-hover:scale-105">
            <BrainIcon size={34} className="stroke-[2.2]" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Second Brain
          </h1>
        </div>
      </SidebarHeader>

      {/* Navigation Menu with all requested types */}
      <SidebarContent className="px-3 py-2">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = selectedType === item.id;

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => onSelectType?.(item.id)}
                      className={`h-11 px-4 rounded-xl text-sm font-medium transition-all duration-150 flex items-center gap-4 ${
                        isActive
                          ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 font-semibold shadow-xs"
                          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                      }`}
                    >
                      <Icon
                        size={20}
                        className={
                          isActive
                            ? "text-indigo-600 dark:text-indigo-400 stroke-[2.2]"
                            : "text-muted-foreground stroke-[1.8]"
                        }
                      />
                      <span className="text-[15px]">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
