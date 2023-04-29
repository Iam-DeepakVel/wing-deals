import Image from "next/image";
import Link from "next/link";

export interface Product {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
  isFeatured: boolean;
  banner?: string;
}

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={640}
          height={640}
          className="rounded shadow"
        />
      </Link>
      <div className=" flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className=" text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button className="primary-button" type="button">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
