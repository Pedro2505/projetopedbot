"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconProps } from "@phosphor-icons/react";

interface HeaderProps {
  title: string;
  subtitle: string;
  icon: React.ForwardRefExoticComponent<IconProps>;
}

export function Header({ title, subtitle, icon: Icon }: HeaderProps) {
  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex flex-col">
        <div className="flex flex-row gap-1 items-center">
          <Icon size={24} weight="bold" />
          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      <div className="flex">
        <Button variant="outline">
          <Bell className="w-4 h-4 mr-2" /> Notificações
        </Button>
      </div>
    </header>
  );
}