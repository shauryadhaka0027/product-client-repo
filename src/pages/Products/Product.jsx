import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const Url = import.meta.env.SERVER_URL;

const Product = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${Url}/create`, formData, { withCredentials: true })
      .then((data) => {
        console.log(data.data);
        alert("New product created");
        fetchProducts();
      })
      .catch((error) => {
        console.error(error);
        alert("Error creating product");
      });

    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
    });
  };

  const fetchProducts = () => {
    axios
      .get(`${Url}/getAllProduct`, { withCredentials: true })
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openUpdateModal = (product) => {
    setCurrentProductId(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    });
    setIsModalOpen(true);
  };

  const updateProduct = (e) => {
    e.preventDefault();
    axios
      .patch(`${Url}/update/${currentProductId}`, formData, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        alert("Product updated");
        fetchProducts();
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Error updating product");
      });
  };

  const deleteProduct = (id) => {
    axios
      .delete(`${Url}/delete/${id}`, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        alert("Product deleted");
        fetchProducts();
      })
      .catch((error) => {
        console.error(error);
        alert("Error deleting product");
      });
  };

  const logout=()=>{
    axios.get( `${Url}/logout`, { withCredentials: true })
   .then((response) => {
     console.log(response.data);
     alert("Logged Out")
     navigate('/login')
   })
  }
  return (
    <>
     
      <div className="flex  bg-[#4094e9] text-white h-12">
        <div className="flex items-center px-10">Products</div>
        <div className="flex items-center w-[80%] px-10 "><Link to="/">Home</Link></div>
        <div className="flex items-center  " onClick={logout}><Link to="/signup">Logout</Link></div>
      </div>

      
      <div className="flex">
       
        <div className="w-[30%] p-4 mt-2">
          <h2 className="text-xl font-bold mb-4">Add Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
           
            <div>
              <label className="block text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Add Product
            </button>
          </form>
        </div>

        
        <div className="w-[70%] p-4 border-2 mt-2">
          <h2 className="text-xl font-bold mb-4">Product List</h2>
          <div className="grid grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover p-4"
                  />
                  <div className="p-4  items-center">
                    <h3 className="font-bold text-2xl text-center">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-center">
                      {product.description}
                    </p>
                    <p className="font-semibold text-blue-600 mt-2 text-center">
                      Rs {product.price}
                    </p>
                  </div>
                  <div className="flex justify-between w-[90%] m-auto mb-4 bg-[#f2eeee]">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                      onClick={() => openUpdateModal(product)}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No products added yet.</p>
            )}
          </div>
        </div>
      </div>

 \
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Update Product</h2>
            <form onSubmit={updateProduct} className="space-y-4">
              <div>
                <label className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Update Product
              </button>
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 ml-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
