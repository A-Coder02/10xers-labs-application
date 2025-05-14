import React from "react";
import Card from "../components/Card";
import Header from "../components/layout-ui/Header";

const Home = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card name={"Product"} price={99} />
      <Card name={"Product"} price={99} />
      <Card name={"Product"} price={99} />
    </section>
  );
};

export default Home;
