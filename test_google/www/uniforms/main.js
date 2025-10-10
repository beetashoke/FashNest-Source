const { useEffect, useState } = React;

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(url, { credentials: "include" })
      .then((r) => r.json())
      .then((json) => {
        if (!isMounted) return;
        setData(json.message || json.data || json);
      })
      .catch((e) => isMounted && setError(e))
      .finally(() => isMounted && setLoading(false));
    return () => {
      isMounted = false;
    };
  }, [url]);
  return { data, loading, error };
}

function CategoryCard({ cat }) {
  const image = cat.hero_image || "https://images.unsplash.com/photo-1520975867597-0f1a6f36f06b?q=80&w=1200&auto=format&fit=crop";
  const btn = cat.button_text || "See Our Collection";
  function openCollection() {
    window.location.href = `/uniforms/${encodeURIComponent(cat.slug || cat.name)}`;
  }
  return (
    React.createElement("div", { className: "card" },
      React.createElement("div", { className: "card-media" },
        React.createElement("img", { src: image, alt: cat.title })
      ),
      React.createElement("div", { className: "card-body" },
        React.createElement("div", { className: "title" }, (cat.title || "Category").toUpperCase()),
        React.createElement("div", { className: "desc" }, cat.description || ""),
        React.createElement("button", { className: "btn", onClick: openCollection }, btn)
      )
    )
  );
}

function App() {
  const base = window.__APP_CONTEXT__.apiBase;
  const { data, loading, error } = useFetch(`${base}.list_categories`);
  if (loading) return React.createElement("div", null, "Loading...");
  if (error) return React.createElement("div", null, "Error: ", String(error));
  const categories = Array.isArray(data) ? data : [];
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "div",
      { className: "grid" },
      categories.map((c) => React.createElement(CategoryCard, { key: c.name, cat: c }))
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));



