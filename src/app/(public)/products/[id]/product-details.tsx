"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa6";
import ScrollToTopButton from "@/components/Frontend/ScrollToTopButton";
import SocialMedia from "@/components/Frontend/SocialMedia";
import { useCart } from "@/hooks/useCart";
import { useGetProductsByCategoriesQuery } from "@/lib/api/publicApi";

interface Product {
  _id: string;
  name: string;
  images: { image: { secure_url: string } }[];
  price: string;
  short_desc: string;
  category_id: string;
  pre_order: number;
  total_stock?: number;
}

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [count, setCount] = useState(1);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const batchSize = 3;
  const { addItem } = useCart();

  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetProductsByCategoriesQuery(
    { categoryId: product.category_id },
    { skip: !product.category_id }
  );

  useEffect(() => {
    if (categoryData) {
      const fetchedCategoryProducts: Product[] = categoryData.map((p: any) => ({
        _id: p._id,
        name: p.name || "Unnamed Product",
        images: p.images || [
          { image: { secure_url: "/assets/images/placeholder.png" } },
        ],
        price: p.price || "0",
        short_desc: p.short_desc || "",
        category_id: p.category_id || "",
        pre_order: p.pre_order || 0,
        total_stock: p.total_stock,
      }));
      console.log("Category Products:", fetchedCategoryProducts);
      setCategoryProducts(fetchedCategoryProducts);
    }
    if (categoryError) {
      console.error("Category Products Error:", categoryError);
    }
  }, [categoryData, categoryError]);

  const increment = () => {
    const stock = product?.total_stock ?? 0;
    if (count < stock) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleButtonClick = () => setPopupVisible(true);
  const handleClosePopup = () => setPopupVisible(false);

  const handleViewMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + batchSize, categoryProducts.length)
    );
  };

  return (
    <div>
      <Toaster position='top-center' />
      
      <ScrollToTopButton />
      <div className='container mx-auto flex pt-14 md:pt-20'>
        <SocialMedia />
        <div className='w-[90%] mx-auto'>
          <div className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10'>
            {/* Image Section */}
            <div>
              <Image
                src={
                  product.images[0]?.image.secure_url ||
                  "/assets/images/placeholder.png"
                }
                alt={product.name}
                width={600}
                height={800}
                className='mx-auto object-cover'
              />
            </div>
            {/* Product Info */}
            <div className='mt-1'>
              <p className='text-xl font-semibold md:text-2xl'>
                {product.name}
              </p>
              <div className='mt-2 md:mt-4'>
                <p className='font-semibold text-lg md:text-xl'>
                  Price - {product.price}
                </p>
                <p className='py-2 text-justify leading-relaxed text-sm '>
                  {product.short_desc}
                </p>
              </div>
              {product.pre_order === 0 && (
                <div className='flex space-x-2 md:space-x-3 mt-2 md:mt-4 items-center'>
                  <p className='font-semibold md:text-lg'>Quantity:</p>
                  <div className='flex items-center'>
                    <button
                      onClick={decrement}
                      className='size-6 md:size-8 text-sm md:text-lg font-semibold bg-teal-700 text-white hover:bg-teal-800'
                      disabled={count <= 1}
                    >
                      <FaMinus className='mx-auto' />
                    </button>
                    <span className='text-sm  md:pt-1 text-center border border-teal-700 size-6 md:size-8 font-medium'>
                      {count}
                    </span>
                    <button
                      onClick={increment}
                      className='size-6 md:size-8 text-sm md:text-lg font-semibold bg-teal-700 text-white hover:bg-teal-800'
                      disabled={count >= (product.total_stock ?? 0)}
                    >
                      <FaPlus className='mx-auto' />
                    </button>
                  </div>
                </div>
              )}
              <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-5 md:mt-8'>
                {product.pre_order === 0 && (
                  <button
                    className='justify-center text-nowrap items-center w-full sm:w-auto px-5 py-2 text-sm  bg-transparent border border-teal-700 text-teal-700 rounded-lg font-semibold hover:bg-teal-700 hover:text-white transition-colors duration-300 ease-in-out hover:scale-105 hover:shadow-2xl shadow'
                    onClick={() => {
                      addItem(product, count);
                    }}
                  >
                    <i className='fas fa-shopping-cart mr-2'></i>Add To Cart
                  </button>
                )}
                {product.pre_order === 0 ? (
                  <Link
                    href='/checkout'
                    onClick={() => {
                      addItem(product, count);
                    }}
                  >
                    <button className='inline-flex justify-center items-center w-full sm:w-auto text-sm  text-nowrap px-8 py-2 bg-gradient-to-r from-teal-500 to-teal-700 border border-teal-200 text-white font-semibold rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl'>
                      <i className='fas fa-shopping-bag mr-2'></i>Buy Now
                    </button>
                  </Link>
                ) : (
                  <a
                    href='https://wa.me/8801632460342'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <button className='flex items-center justify-center px-16 md:px-24 py-1 md:py-2 border border-gray-900 hover:border-green-700 text-sm text-nowrap md:text-lg hover:text-white rounded-lg hover:bg-green-700 transition-colors hover:scale-105 duration-300 ease-in-out group hover:shadow-xl'>
                      <i className='fab fa-whatsapp text-lg md:text-xl text-green-500 mr-2 group-hover:text-white'></i>
                      Chat Now
                    </button>
                  </a>
                )}
                {product.pre_order === 0 && (
                  <button
                    className='inline-flex text-nowrap justify-center items-center sm:w-auto w-full text-sm  hover:underline'
                    onClick={handleButtonClick}
                  >
                    <Image
                      src='/assets/measuring-tape.svg'
                      alt='Measuring Tape'
                      width={20}
                      height={20}
                      className='size-4 md:size-5 mr-2'
                    />
                    Size Guide
                  </button>
                )}
                {isPopupVisible && (
                  <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50'>
                    <div className='bg-white rounded p-4 relative'>
                      <button
                        className='absolute top-2 right-5 text-lg text-gray-800 hover:text-gray-500'
                        onClick={handleClosePopup}
                      >
                        <i className='fas fa-times'></i>
                      </button>
                      <h2 className='text-lg font-bold mb-4'>Size Guide</h2>
                      <div className='overflow-x-auto'>
                        <table className='min-w-full'>
                          <thead>
                            <tr className='bg-gray-100'>
                              <th className='border border-gray-300 p-2'>
                                Size
                              </th>
                              <th className='border border-gray-300 p-2'>
                                Bust (inches)
                              </th>
                              <th className='border border-gray-300 p-2'>
                                Waist (inches)
                              </th>
                              <th className='border border-gray-300 p-2'>
                                Hip (inches)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className='border border-gray-300 p-2'>S</td>
                              <td className='border border-gray-300 p-2'>
                                32-34
                              </td>
                              <td className='border border-gray-300 p-2'>
                                26-28
                              </td>
                              <td className='border border-gray-300 p-2'>
                                36-38
                              </td>
                            </tr>
                            <tr>
                              <td className='border border-gray-300 p-2'>M</td>
                              <td className='border border-gray-300 p-2'>
                                34-36
                              </td>
                              <td className='border border-gray-300 p-2'>
                                28-30
                              </td>
                              <td className='border border-gray-300 p-2'>
                                38-40
                              </td>
                            </tr>
                            <tr>
                              <td className='border border-gray-300 p-2'>L</td>
                              <td className='border border-gray-300 p-2'>
                                36-38
                              </td>
                              <td className='border border-gray-300 p-2'>
                                30-32
                              </td>
                              <td className='border border-gray-300 p-2'>
                                40-42
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className='mt-3 md:mt-6'>
                <p className='text-justify leading-relaxed text-sm '>
                  <span className='font-semibold'>Care: </span> Dry Clean Only
                  Preserve: in air tight poly.
                </p>
              </div>
              <div className='mt-2 md:mt-4'>
                <p className='text-justify text-sm leading-relaxed '>
                  <span className='font-semibold'>Disclaimer: </span> Product
                  colour may slightly vary due to photographic lighting sources
                  or your monitor setting. Lace and/or Embellishments and Fabric
                  or Material may vary depending on availability.
                </p>
              </div>
            </div>
          </div>
          <div className='text-xl md:text-2xl mt-6 font-semibold'>
            <p>You May Also Like</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 justify-items-center'>
            {categoryProducts
              .filter((item) => item._id !== product._id)
              .slice(0, visibleCount)
              .map((relatedProduct) => (
                <div className='mb-2' key={relatedProduct._id}>
                  <Link
                    href={`/products/${relatedProduct.name}-${relatedProduct._id}`}
                  >
                    <Image
                      src={
                        relatedProduct.images[0]?.image.secure_url ||
                        "/assets/images/placeholder.png"
                      }
                      alt={relatedProduct.name || "Product image"}
                      width={400}
                      height={500}
                      className='w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105'
                    />
                  </Link>
                </div>
              ))}
          </div>
          {visibleCount <
            categoryProducts.filter((item) => item._id !== product._id)
              .length && (
            <div className='text-center my-5'>
              <button
                onClick={handleViewMore}
                className='px-7 py-1 text-sm  border hover:bg-gradient-to-b from-teal-500 to-teal-700 hover:text-white hover:border-teal-500 border-gray-800 rounded'
              >
                View More
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='fixed bottom-0 left-0 right-0 z-30 md:hidden flex flex-col space-y-2 w-full'>
        <div className='mx-2 p-2 rounded-md bg-gray-300 w-fit'>
          <a
            href='tel:+8801632460342'
            className='flex items-center text-teal-800 font-semibold'
          >
            <i className='fas fa-phone mr-2 text-red-700'></i>
            01632460342
          </a>
        </div>
        {product.pre_order === 0 ? (
          <div className='flex justify-between w-full'>
            <button
              className='py-3 w-full text-white bg-gradient-to-r from-yellow-400 text-lg to-yellow-600 font-medium'
              onClick={() => addItem(product, count)}
            >
              <i className='fas fa-shopping-cart mr-2'></i>Add To Cart
            </button>
            <Link
              href='/checkout'
              className='w-full relative text-white flex text-lg justify-center items-center text-nowrap font-medium bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700'
              onClick={() => addItem(product, count)}
            >
              <span className='absolute border-r-[24px] border-l-transparent border-r-transparent border-t-[50px] border-t-yellow-600 left-0 top-0'></span>
              <i className='fas fa-shopping-bag mr-2'></i>Buy Now
            </Link>
          </div>
        ) : (
          <a
            href='https://wa.me/8801632460342'
            target='_blank'
            rel='noopener noreferrer'
            className='w-full px-2'
          >
            <button className='w-full mx-auto text-white bg-gradient-to-r from-green-500 to-green-700 px-6 py-3 rounded-full'>
              <i className='fab fa-whatsapp text-lg md:text-xl mr-2 text-white'></i>
              Chat Now
            </button>
          </a>
        )}
      </div>
     
    </div>
  );
};

export default ProductDetails;
