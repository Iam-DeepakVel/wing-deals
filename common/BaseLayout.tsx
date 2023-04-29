import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

type BaseLayoutProps = {
  title: string;
  children?: React.ReactNode;
};

const BaseLayout = ({ children, title }: BaseLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} | WingDeals` : "WingDeals"}</title>
        <meta
          name="description"
          content="Wing Deals is an Ecommerce application."
        />
      </Head>
      <div className=" flex min-h-screen flex-col justify-between">
        <Header />
        <main className=" container m-auto mt-4 px-4">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default BaseLayout;
