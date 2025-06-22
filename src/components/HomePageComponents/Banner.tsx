"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import CommonLayout from "@/app/layouts/CommonLayout";
import Button from "../ui/Button";

export default function Banner() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className='mb-2 mt-[-14px]'>
      <Slider {...settings}>
        <div className='relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]'>
          <div className='absolute inset-0 bg-black/50  z-10'></div>
          <CommonLayout>
            <div className='absolute top-1/2 transform -translate-y-1/2 lg:w-1/3 w-[275px] p-3 md:p-0 z-20 '>
              <h1 className='text-white text-4xl md:text-7xl font-semibold '>
                Save Up To 40%
              </h1>
              <p className='text-sm text-white mt-3 text-justify w-[250px] md:w-full'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto
                non eaque ad inventore? Quam labore at cum, fugit ea culpa saepe
                iure incidunt aliquam inventore aut fugiat, possimus voluptate
                aspernatur. Fugit consequuntur reiciendis voluptatum earum.
              </p>
              <div className='mt-8'>
                <Button className='bg-purple-700 text-white hover:text-purple-700 hover:bg-white duration-500'>
                  Shop Now
                </Button>
              </div>
            </div>
          </CommonLayout>

          <Image
            src='/assets/banner.png'
            alt='Summer Sale'
            fill
            priority
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw'
          />
        </div>

        <div className='relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]'>
          <div className='absolute inset-0 bg-black/50  z-10'></div>
          <CommonLayout>
            <div className='absolute top-1/2 transform -translate-y-1/2 lg:w-1/3 w-[275px] p-3 md:p-0 z-20 '>
              <h1 className='text-white text-4xl md:text-7xl font-semibold '>
                Save Up To 40%
              </h1>
              <p className='text-sm text-white mt-3 text-justify w-[250px] md:w-full'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto
                non eaque ad inventore? Quam labore at cum, fugit ea culpa saepe
                iure incidunt aliquam inventore aut fugiat, possimus voluptate
                aspernatur. Fugit consequuntur reiciendis voluptatum earum.
              </p>
              <div className='mt-8'>
                <Button className='bg-purple-700 text-white hover:text-purple-700 hover:bg-white duration-500'>
                  Shop Now
                </Button>
              </div>
            </div>
          </CommonLayout>

          <Image
            src='/assets/banner2.png'
            alt='Summer Sale'
            fill
            priority
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw'
          />
        </div>
      </Slider>
    </div>
  );
}
