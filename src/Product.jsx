import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const { productId } = useParams();

  const fetchProduct = async () => {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);

    const data = await response.json();

    return data;
  };

  const {
    isLoading,
    error: queryError,
    data: product,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: fetchProduct,
  });

  //! Mutations

  //! Mutation is used when we need to update the state
  const {
    mutate,
    isPending,
    isError,
    error: mutationError,
  } = useMutation({
    mutationFn: (newProduct) => {
      return axios.put(
        `https://dummyjson.com/products/${productId}`,
        newProduct
      );
    },
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (queryError) {
    return (
      <h3>
        Error:{" "}
        {queryError?.response?.data?.message ||
          queryError?.message ||
          "Something went wrong"}
      </h3>
    );
  }

  //! mutation state
  if (isPending) {
    return <h2>Updating title</h2>;
  }

  if (isError) {
    return (
      <h3>
        Error:{" "}
        {mutationError?.response?.data?.message ||
          mutationError?.message ||
          "Something went wrong"}
      </h3>
    );
  }
  return (
    <div>
      Product: {product.title}
      <img src={product.images[0]} alt="" />
      <button
        style={{ backgroundColor: "skyblue", color: "darkgray" }}
        onClick={() => {
          mutate({
            title: "Updated title",
          });
        }}
      >
        Update Button
      </button>
    </div>
  );
};

export default Product;
