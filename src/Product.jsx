import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const Product = () => {
  const { productId } = useParams();

  const fetchProduct = async () => {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);

    const data = await response.json();

    return data;
  };

  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: fetchProduct,
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <h3>Error: {error}</h3>;
  }
  return (
    <div>
      Product: {product.title}
      <img src={product.images[0]} alt="" />
    </div>
  );
};

export default Product;
