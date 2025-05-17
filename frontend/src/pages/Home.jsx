import React from "react";
// Components
import Card from "../components/Card";
import useProducts from "../hooks/useProducts";

const Home = () => {
  const { list, loading } = useProducts();

  if (loading) return <h1 className="text-center">Loading Products....</h1>;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Mapping fetched data */}
      {list.map((row) => (
        <Card
          name={row.name}
          price={row.price}
          id={row.id}
          description={row.description}
          image={row.img_url}
        />
      ))}
    </section>
  );
};

export default Home;
