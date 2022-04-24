import type { NextPage } from "next";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import toast, { Toaster } from "react-hot-toast";
import Banner from "../components/Banner";
import { prisma } from "../lib/prisma";
import Login from "../components/login";
// import Footer from "../components/Footer";

const notify = () => toast("Here is a toast.");

// export async function getServerSideProps() {
//   const cart = await prisma.shoppingCart.findMany({
//     where: {
//       userId: "cl2dgsopn000007nu7g7tw4w3",
//     },
//     select: {
//       books: true,
//     },
//   });
//   return {
//     props: {
//       initialCart: cart,
//     },
//   };
// }

const Home: NextPage = ({ bookData, cartData }: any) => {
  console.log(cartData);
  const data = {
    title: "The Lightning Thief",
    author: "Rick Riordan",
    image: "https://images-na.ssl-images-amazon.com/images/I/91RQ5d-eIqL.jpg",
    altText: "Percy Jackson Book Cover",
    price: "$15.00",
  };

  const data2 = {
    bookTitle: "City of Bones",
    authorName: "Cassandra Clare",
    bookCoverUrl:
      "https://images-na.ssl-images-amazon.com/images/I/81GvNdZqETL.jpg",
    altText: "City of Bones Book Cover",
    bookPrice: "$15.00",
  };

  // async function test() {
  //   const cart = await prisma.shoppingCart.findMany({
  //     where: {
  //       userId: "cl2dgsopn000007nu7g7tw4w3",
  //     },
  //     select: {
  //       books: true,
  //     },
  //   });

  //   console.log(cart);
  // }

  // test();

  return (
    <div id="outer-container" className="bg-p1 h-screen w-full">
      <Toaster />
      <div id="page-wrap">
        <Header />
        <Banner />

        {/* product container */}
        <div className="flex flex-col items-center">
          <h1 className=" text-coffee text-3xl m-6">Trending Books</h1>
          <div className="flex justify-center content-evenly space-x-6">
            {/* <ProductCard productData={data} /> */}
            {/* <ProductCard productData={data2} />
            <ProductCard productData={data} />
            <ProductCard productData={data2} /> */}

            {bookData.map((book: any) => (
              <ProductCard productData={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps() {
  // const prisma = new PrismaClient();
  const cartData = await prisma.shoppingCart.findMany({
    where: {
      userId: "cl2dgsopn000007nu7g7tw4w3",
    },
    select: {
      books: true,
    },
  });

  const bookData = await prisma.book.findMany({
    select: {
      title: true,
      author: true,
      image: true,
      price: true,
    },
  });

  return {
    props: {
      bookData: bookData,
      cartData: cartData,
    },
  };
}

export default Home;
