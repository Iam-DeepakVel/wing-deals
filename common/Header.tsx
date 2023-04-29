import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav className=" flex h-12 items-center px-8 justify-between shadow-md">
        <Link href="/">
          <p className="text-lg font-bold">WingDeals</p>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/cart">Cart</Link>
          <Link href="/login">Login</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
