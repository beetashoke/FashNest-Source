import { useEffect, useState } from 'react'
import { listCategories, downloadBrochure } from '../api/uniforms'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SocialSidebar from '../components/SocialSidebar'

type Category = {
    name: string
    title: string
    slug?: string
    description?: string
    hero_image?: string
    button_text?: string
}

export default function Home() {
    const [cats, setCats] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        listCategories().then((d) => { setCats(d || []); setLoading(false) })
    }, [])

    if (loading) return <div className="container">Loading...</div>

    return (
        <>
            <Header />
            <div className="container">
                <div className="hero-section">
                    <h1>Our Products</h1>
                    <p>Choose from our product ranges</p>
                    <p className="hero-subtitle">From school to profession, we have all types of uniform. Choose accordingly!</p>
                </div>

                <div className="grid">
                    {cats.map((c) => (
                        <div className="card" key={c.name}>
                            <div className="card-media">
                                {c.hero_image ? <img src={c.hero_image} alt={c.title} /> : null}
                            </div>
                            <div className="card-body">
                                <div className="title">{(c.title || 'Category').toUpperCase()}</div>
                                <div className="desc">{c.description}</div>
                                <a className="btn" href={`/collection/${encodeURIComponent(c.slug || c.name)}`}>{c.button_text || 'See Our Collection'}</a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="download-section">
                    <button
                        className="btn download-brochure-btn"
                        onClick={async () => {
                            try {
                                await downloadBrochure()
                            } catch (error) {
                                console.error('Failed to download brochure:', error)
                                alert('Failed to download brochure. Please try again.')
                            }
                        }}
                    >
                        Download Brochure
                    </button>
                </div>
            </div>
            <SocialSidebar />
            <Footer />
        </>
    )
}


