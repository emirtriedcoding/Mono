"use client";

import Image from "next/image";

import { motion } from "framer-motion";

const MorePics = () => {
  const images = [
    "cat",
    "dog",
    "wolf",
    "demon",
    "wdemon",
    "wdemon2",
    "nature",
    "tiger",
    "dragon",
    "wild",
  ];

  return (
    <div className="flex flex-col items-center gap-3">
      <h5 className="font-bold text-lg  my-5">
        تصاویر و نمونه های بیشتر :
      </h5>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 p-2">
        {images.map((image, index) => (
          <motion.div
            key={image}
            initial={{
              opacity: 0,
              x: -10,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              amount: "all",
              once: true,

            }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
            }}
          >
            <Image
              className="rounded-lg shadow-2xl shadow-primary/50"
              src={`/assets/${image}.jpeg`}
              width="600"
              height="900"
              alt="Woman Demon"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MorePics;
