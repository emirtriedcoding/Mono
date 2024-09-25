"use client";

import { motion } from "framer-motion";

const Showcase = () => {
  return (
    <div className="flex flex-col gap-3" >
      <h6 className="font-bold text-lg text-center lg:text-2xl">
        با کیفیت ترین تصاویر :
      </h6>
      <img
        className="rounded-lg shadow-2xl shadow-primary/50"
        src="/assets/model.jpeg"
        width="1000"
        height="900"
        alt="Model"
      />
      <h6 className="font-bold text-lg text-center lg:text-2xl" >
        قابلیت سفارشی سازی بسیار :
      </h6>
      <img
        className="rounded-lg shadow-2xl shadow-primary/50"
        src="/assets/tiger2.jpeg"
        width="1000"
        height="900"
        alt="Tiger driving car"
      />
      <h6 className="font-bold text-2xl text-muted-foreground my-5">
        حوزه های مختلف :
      </h6>
    </div>
  );
};

export default Showcase;
