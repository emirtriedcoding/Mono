"use client"

import Image from "next/image";

import MarqueeSlider from "react-marquee-slider";


const Slider = () => {
  return (
    <div>
    <MarqueeSlider
      direction="rtl" // Right to Left
      velocity={12} // Speed of scroll
      scatterRandomly={false} // Whether images scatter randomly
      resetAfterTries={3} // Number of tries before reset
      onInit={() => {}} // Callback for init
      onFinish={() => {}} // Callback for finish
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <Image
          key={i}
          src={`/assets/${i + 1}.jpeg`}
          alt={`img-${i}`}
          className="rounded-lg mr-2"
          width={500}
          height={300}
        />
      ))}
    </MarqueeSlider>
  </div>
  )
}

export default Slider