import { StoreContext } from "@/utils/Context/Store";
import Link from "next/link";
import { useContext } from "react";

const Header = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { cart } = state;
  return (
    <header>
      <nav className=" flex h-12 items-center px-8 justify-between shadow-md">
        <Link href="/">
          <p className="text-lg font-bold">WingDeals</p>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/cart">
            <div>
              Cart
              {cart.cartItems.length > 0 && (
                <span className=" ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </span>
              )}
            </div>
          </Link>
          <Link href="/login">Login</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
