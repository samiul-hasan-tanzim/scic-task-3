import ProductCard from "./ProductCard";

const products = [
    {
        id: 1,
        title: "Quantum Engine",
        description:
            "High-performance framework for enterprise analytics.",
        image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        rating: 4.9,
        price: "$299/mo",
        badge: "New",
    },
    {
        id: 2,
        title: "CloudSync Pro",
        description:
            "Infrastructure synchronization across cloud systems.",
        image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
        rating: 4.7,
        price: "Free Tier",
    },
    {
        id: 3,
        title: "Core API",
        description:
            "REST API gateway with ultra-low latency.",
        image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475",
        rating: 4.8,
        price: "$49/mo",
    },
    {
        id: 4,
        title: "AI Pilot",
        description:
            "AI assistant for code optimization and testing.",
        image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995",
        rating: 4.9,
        price: "$199/mo",
    },
    {
        id: 5,
        title: "Data Vault",
        description:
            "Decentralized storage with rapid retrieval.",
        image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
        rating: 4.6,
        price: "$15/TB",
    },
    {
        id: 6,
        title: "Team Flow",
        description:
            "Engineering collaboration platform.",
        image:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        rating: 4.9,
        price: "$12/user",
    },
];

export default function ProductGrid() {
    return (
        <section className="mt-8">
            <div
                className="
                    grid gap-6
                    sm:grid-cols-2
                    xl:grid-cols-3
                "
            >
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        {...product}
                    />
                ))}
            </div>
        </section>
    );
}