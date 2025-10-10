import React, { createContext, useContext, useEffect, useState } from 'react'
import { getCompanySettings, listCategories } from '../api/uniforms'

export type CompanySettings = {
    company_name?: string
    tagline?: string
    phone?: string
    email?: string
    address?: string
    city?: string
    state?: string
    pincode?: string
    website?: string
    facebook_url?: string
    twitter_url?: string
    instagram_url?: string
    youtube_url?: string
    whatsapp_number?: string
}

export type Category = {
    name: string
    title: string
    slug?: string
}

type SettingsContextType = {
    settings: CompanySettings | null
    categories: Category[]
    loading: boolean
}

const SettingsContext = createContext<SettingsContextType>({ settings: null, categories: [], loading: true })

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<CompanySettings | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            try {
                const [s, c] = await Promise.all([
                    getCompanySettings().catch(() => ({})),
                    listCategories().catch(() => ([])),
                ])
                setSettings(s || null)
                setCategories(Array.isArray(c) ? c : [])
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    return (
        <SettingsContext.Provider value={{ settings, categories, loading }}>
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettings() {
    return useContext(SettingsContext)
}




