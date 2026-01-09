'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import RollingImage from '@/public/images/landing/RollingImages1.png';

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
          src={RollingImage}
          alt="RolloingImages1"
          priority
          width={982.25}
          height={566}
          className="shrink-0 pr-5.5"
        />
        <Image
          src={RollingImage}
          alt="RolloingImages1"
          width={982.25}
          height={566}
          className="shrink-0 pr-5.5"
        />
      </motion.div>
    </div>
  );
}
