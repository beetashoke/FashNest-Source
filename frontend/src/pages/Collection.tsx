import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { listCategories, listItems, listSubcategories } from '../api/uniforms'
import { useCart } from '../contexts/CartContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SocialSidebar from '../components/SocialSidebar'

type Item = {
    name: string;
    title: string;
    image?: string;
    short_description?: string;
    price?: number;
    category?: string;
    subcategory?: string;
}
type Subcategory = { name: string; title: string; slug?: string; image?: string }

export default function Collection() {
    const { slug } = useParams()
    const { addItem } = useCart()
    const [items, setItems] = useState<Item[]>([])
    const [subcats, setSubcats] = useState<Subcategory[]>([])
    const [title, setTitle] = useState<string>('Collection')
    const [selectedSubcat, setSelectedSubcat] = useState<Subcategory | null>(null)

    const handleBuyNow = (item: Item) => {
        // For now, we'll show an alert. This can be replaced with actual purchase logic
        alert(`Buy Now clicked for: ${item.title}`)
        // TODO: Implement actual purchase flow (redirect to checkout, add to cart, etc.)
    }

    useEffect(() => {
        async function load() {
            const [cats, its, subs] = await Promise.all([listCategories(), listItems(slug), listSubcategories(slug)])
            const found = (cats || []).find((c: any) => (c.slug || c.name) === slug)
            if (found?.title) setTitle(found.title)
            setItems(its || [])
            setSubcats(subs || [])
        }
        load()
        setSelectedSubcat(null)
    }, [slug])

    return (
        <>
            <Header />
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0 16px' }}>
                    <Link className="btn" to="/">← Back</Link>
                    <h2 style={{ margin: 0 }}>{title}</h2>
                    <span />
                </div>
                {subcats.length ? (
                    selectedSubcat === null ? (
                        <div className="grid">
                            {subcats.map((sc) => (
                                <div
                                    key={sc.name}
                                    className="subcat-card"
                                    onClick={() => setSelectedSubcat(sc)}
                                    role="button"
                                >
                                    {sc.image ? (
                                        <div className="card-media" style={{ borderBottom: '1px solid #eef2f7' }}>
                                            <img src={sc.image} alt={sc.title} />
                                        </div>
                                    ) : null}
                                    <div className="subcat-card-body">
                                        <div className="title" style={{ textTransform: 'none' }}>{sc.title}</div>
                                        <div className="desc">View items</div>
                                        <button className="btn" style={{ width: '100%', marginTop: 8 }}>View Items</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ marginBottom: 24 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0 16px' }}>
                                <button className="btn" onClick={() => setSelectedSubcat(null)}>
                                    ← All Subcategories
                                </button>
                                <h3 style={{ margin: 0 }}>{selectedSubcat.title}</h3>
                                <span />
                            </div>
                            <div className="grid">
                                {items.filter((it) => it.subcategory === selectedSubcat?.name).map((it) => (
                                    <div className="card" key={it.name}>
                                        <div className="card-media">{it.image ? <img src={it.image} alt={it.title} /> : null}</div>
                                        <div className="card-body">
                                            <div className="title" style={{ textTransform: 'none' }}>{it.title}</div>
                                            <div className="desc">{it.short_description}</div>
                                            {it.price && (<div className="price">₹{it.price.toFixed(2)}</div>)}
                                            <button
                                                className="btn add-to-cart-btn"
                                                onClick={() => addItem({ id: it.name, title: it.title, price: it.price || 0, image: it.image, category: title, subcategory: selectedSubcat?.title })}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                ) : (
                    <div className="grid">
                        {items.length ? items.map((it) => (
                            <div className="card" key={it.name}>
                                <div className="card-media">{it.image ? <img src={it.image} alt={it.title} /> : null}</div>
                                <div className="card-body">
                                    <div className="title" style={{ textTransform: 'none' }}>{it.title}</div>
                                    <div className="desc">{it.short_description}</div>
                                    {it.price && (<div className="price">₹{it.price.toFixed(2)}</div>)}
                                    <button
                                        className="btn add-to-cart-btn"
                                        onClick={() => addItem({ id: it.name, title: it.title, price: it.price || 0, image: it.image, category: title })}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        )) : <div>No items yet.</div>}
                    </div>
                )}
            </div>
            <SocialSidebar />
            <Footer />
        </>
    )
}


