import BaseLayout from "@/common/BaseLayout";
import { Product } from "@/components/ProductItem";
import { StoreContext } from "@/utils/Context/Store";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { FiXCircle } from "react-icons/fi";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

function CartScreen() {
  const { state, dispatch } = useContext(StoreContext);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item: Product) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const router = useRouter();

  const updateCartHandler = (item: Product, qty: string) => {
    const quantity = Number(qty);
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  return (
    <BaseLayout title="Shopping Cart">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is Empty. <Link href="/">Go Shoppping </Link>
        </div>
      ) : (
        <div className=" grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className=" border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <div className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;
                          {item.name}
                        </div>
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      {/* Passing e to get value of selected option */}
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-right">
                      <button onClick={() => removeItemHandler(item)}>
                        <FiXCircle />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3">
                  Subtotal {cartItems.reduce((a, c) => a + c.quantity, 0)} : $
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li className="primary-button rounded-md w-full">
                <button onClick={() => router.push("login?redirect=/shipping")}>
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </BaseLayout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
