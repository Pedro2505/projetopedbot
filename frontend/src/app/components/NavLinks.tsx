'use client'

import { routes } from "@/utils/routes";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function NavLinks() {
    const pathname = usePathname();
    const router = useRouter();

    const [isPending, startTransition] = useTransition()
    const [loadingRoute, setLoadingRoute] = useState<string | null>(null)

    function handleNavigation(href: string) {
        setLoadingRoute(href)
        startTransition(() => {
            router.push(href)
        })
    }
    return (
        <nav className="flex flex-col gap-3">
            {routes.map((link) => {
                return (
                    <button 
                        onClick={() => handleNavigation(link.href)} key={link.href}
                        className={`text-left px-3 py-2 rounded-md hover:bg-teal-100 transition-colors 
                            ${pathname === link.href ? 'bg-teal-200 font-semibold' : ''} 
                            ${isPending && loadingRoute === link.href ? 'opacity-50 cursor-not-allowed' : ''}`
                        } 
                        disabled={isPending && loadingRoute === link.href}
                    >
                    {link.label}
                    </button>
                )
            })}
        </nav>
    )
}