import React from "react";
import Header from "../components/layout-ui/Header";
import Button from "../components/form-ui/Button";
import Table from "../components/Table";

const Portal = () => {
  const columns = [
    {
      field: "id",
      label: "ID",
      renderCell: (data) => `#${data.id}`,
    },
    {
      field: "image",
      label: "Image",
      minWidth: "300px",
      renderCell: (data) => <img src={data.image} alt="thumbnail" />,
    },
    {
      field: "name",
      label: "Name",
      minWidth: "150px",
    },
    {
      field: "description",
      label: "Description",
      minWidth: "300px",
    },
    {
      field: "action",
      label: "Action",
      flex: 1,
      renderCell: (data) => (
        <div className="flex gap-4">
          <Button>View</Button>
          <Button variant="outlined">Remove</Button>
        </div>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      image: "https://via.placeholder.com/50",
      name: "Product A",
      description: "High-quality product A",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/50",
      name: "Product B",
      description: "Durable and reliable product B",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/50",
      name: "Product C",
      description: "Affordable and efficient product C",
    },
  ];
  return (
    <div className="flex flex-col flex-1">
      <section className="flex flex-1 flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">Products</h2>
          <div className="flex gap-4">
            <Button>Add Product</Button>
          </div>
        </div>
        <Table columns={columns} rows={rows} />
      </section>
    </div>
  );
};

export default Portal;
