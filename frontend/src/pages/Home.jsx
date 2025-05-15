import React from "react";
// Components
import Card from "../components/Card";

const Home = () => {
  const rows = [
    {
      id: 1,
      image: "https://via.placeholder.com/50",
      name: "Product A",
      price: 99,
      description: "High-quality product A",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/50",
      name: "Product B",
      price: 99,
      description: "Durable and reliable product B",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/50",
      name: "Product C",
      price: 99,
      description: "Affordable and efficient product C",
    },
  ];
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Mapping fetched data */}
      {rows.map((row) => (
        <Card
          name={row.name}
          price={row.price}
          id={row.id}
          description={row.description}
          image={row.image}
        />
      ))}
    </section>
  );
};

export default Home;
