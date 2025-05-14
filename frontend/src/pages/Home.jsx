import React from "react";
import Card from "../components/Card";

const Home = () => {
  return (
    <div>
      <header className="flex justify-between border-b border-b-black pb-3">
        <div className="font-medium text-lg">Brand.</div>
      </header>

      <section className="py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card name={"Product"} price={99} />
        <Card name={"Product"} price={99} />
        <Card name={"Product"} price={99} />
      </section>
    </div>
  );
};

export default Home;
