import { api } from './client'

export async function listCategories() {
    const { data } = await api.get('/test_google.google_testing.api.list_categories')
    return data.message || data.data || data
}

export async function listItems(category?: string) {
    const { data } = await api.get('/test_google.google_testing.api.list_items', { params: { category } })
    return data.message || data.data || data
}

export async function getCompanySettings() {
    const { data } = await api.get('/test_google.google_testing.api.get_company_settings')
    return data.message || data.data || data
}

export async function downloadBrochure() {
    const { data } = await api.get('/test_google.google_testing.api.generate_brochure')
    const result = data.message || data.data || data

    // Decode base64 content
    const content = atob(result.content)

    // Create blob and download
    const blob = new Blob([content], { type: result.type || 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = result.filename || 'brochure.txt'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
}

export async function listSubcategories(category?: string) {
    const { data } = await api.get('/test_google.google_testing.api.list_subcategories', { params: { category } })
    return data.message || data.data || data
}


