"use client"
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

const ThemeToggler = () => {
    const { theme, setTheme } = useTheme()
    const handleToggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }
  return (
    <div className="flex items-center">
                <Button className="rounded-full" variant="secondary" onClick={handleToggleTheme}>
                    {
                        theme === "dark" ? <Sun className="text-xs text-muted-foreground" /> : <Moon className="text-xs text-muted-foreground" />
                    }
                </Button>
    </div>
  )
}

export default ThemeToggler