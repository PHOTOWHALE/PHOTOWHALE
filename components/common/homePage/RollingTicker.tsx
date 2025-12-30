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
        }}
      >
        <div className="flex gap-5">
          <Image src="/RollingImageEx.png" alt="background" width={982.25} height={566} />
          <Image src="/RollingImageEx.png" alt="background" width={982.25} height={566} />
        </div>
      </motion.div>
    </div>
  );
}
