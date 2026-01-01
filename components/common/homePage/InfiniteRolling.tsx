'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function InfiniteRolling() {
  return (
    <div className="w-full overflow-hidden">
      <motion.div
        className="flex w-max"
        animate={{
          x: [0, '-50%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
      >
        <Image
          src="/images/landing/RollingImages1.png"
          alt="RolloingImages1"
          width={982.25}
          height={566}
          className="shrink-0 pr-5.5"
        />
        <Image
          src="/images/landing/RollingImages1.png"
          alt="RolloingImages1"
          width={982.25}
          height={566}
          className="shrink-0 pr-5.5"
        />
      </motion.div>
    </div>
  );
}
