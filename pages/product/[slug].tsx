import BaseLayout from "@/common/BaseLayout";
import data from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const ProductScreen = () => {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <p className="text-md font-semibold">Product not Found</p>;
  }
  return (
    <BaseLayout title={product.name}>
      <div className="py-2">
        <Link href="/">Back to Products</Link>
      </div>
      <div className=" grid md:grid-cols-4 md:gap-3">
        <div className=" md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div className="card p-5">
          <div className=" mb-2 flex justify-between">
            <p>Price</p>
            <p>${product.price}</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p>Status</p>
            <div>{product.countInStock > 0 ? "In stock" : "Out of Stock"}</div>
          </div>
          <button className=" primary-button w-full">Add to Cart</button>
        </div>
      </div>
    </BaseLayout>
  );
};

export default ProductScreen;
