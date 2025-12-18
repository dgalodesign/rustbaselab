"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Zap, Users } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTranslations } from "@/lib/i18n/context"
import Image from "next/image"

interface MobileNavProps {
    types?: Array<{ id: string; name: string }>
    teamSizes?: Array<{ id: string; name: string }>
}

export function MobileNav({ types = [], teamSizes = [] }: MobileNavProps) {
    const [open, setOpen] = React.useState(false)
    const pathname = usePathname()
    const { t } = useTranslations()

    const staticPageMap: Record<string, string> = {
        solo: "/bases/solo",
        duo: "/bases/duo",
        trio: "/bases/trio",
        quad: "/bases/quad",
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <SheetHeader className="px-1 text-left">
                    <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                    <Link
                        href="/"
                        className="flex items-center"
                        onClick={() => setOpen(false)}
                    >
                        <Image
                            src="/logo.svg"
                            alt="RustBaseLab"
                            width={120}
                            height={30}
                            className="h-6 w-auto"
                            priority
                        />
                    </Link>
                </SheetHeader>
                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-1 pr-6">
                    <div className="flex flex-col space-y-3">
                        <Link
                            href="/bases"
                            onClick={() => setOpen(false)}
                            className={`text-foreground/70 transition-colors hover:text-foreground font-medium py-2 ${pathname === "/bases" ? "text-primary font-bold" : ""
                                }`}
                        >
                            {t.nav.allBases}
                        </Link>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="types">
                                <AccordionTrigger className="text-foreground/70 hover:text-foreground py-2 font-medium">
                                    {t.home.filters.type}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col space-y-2 pl-4">
                                        <Link
                                            href="/bases?type=all"
                                            onClick={() => setOpen(false)}
                                            className="text-foreground/70 transition-colors hover:text-foreground py-1"
                                        >
                                            {t.home.filters.allTypes}
                                        </Link>
                                        {types.map((type) => (
                                            <Link
                                                key={type.id}
                                                href={`/bases?type=${type.id}`}
                                                onClick={() => setOpen(false)}
                                                className="text-foreground/70 transition-colors hover:text-foreground py-1"
                                            >
                                                {type.name}
                                            </Link>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="team-sizes">
                                <AccordionTrigger className="text-foreground/70 hover:text-foreground py-2 font-medium">
                                    {t.home.filters.teamSize}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col space-y-2 pl-4">
                                        <Link
                                            href="/bases?teamSize=all"
                                            onClick={() => setOpen(false)}
                                            className="text-foreground/70 transition-colors hover:text-foreground py-1"
                                        >
                                            {t.home.filters.allTeamSizes}
                                        </Link>
                                        {teamSizes.map((size) => {
                                            const href = staticPageMap[size.name.toLowerCase()] || `/bases?teamSize=${size.id}`
                                            return (
                                                <Link
                                                    key={size.id}
                                                    href={href}
                                                    onClick={() => setOpen(false)}
                                                    className="text-foreground/70 transition-colors hover:text-foreground py-1"
                                                >
                                                    {size.name}
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Link
                            href="/favorites"
                            onClick={() => setOpen(false)}
                            className={`text-foreground/70 transition-colors hover:text-foreground font-medium py-2 ${pathname === "/favorites" ? "text-primary font-bold" : ""
                                }`}
                        >
                            Favorites
                        </Link>

                        <Link
                            href="/feedback"
                            onClick={() => setOpen(false)}
                            className={`text-foreground/70 transition-colors hover:text-foreground font-medium py-2 ${pathname === "/feedback" ? "text-primary font-bold" : ""
                                }`}
                        >
                            {t.nav.feedback}
                        </Link>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
