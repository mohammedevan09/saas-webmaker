'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type Card = {
  id: number
  content: JSX.Element | React.ReactNode | string
  className: string
  thumbnail: string
}

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [hovered, setHovered] = useState<Card | null>(null)

  const handleMouseEnter = (card: Card) => {
    setHovered(card)
  }

  const handleMouseLeave = () => {
    setHovered(null)
  }

  return (
    <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative md:min-h-[650px] min-h-[1000px]">
      {cards.map((card, i) => (
        <div
          key={i}
          className={cn(card.className, '')}
          onMouseEnter={() => handleMouseEnter(card)}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className={cn(
              card.className,
              'relative overflow-hidden',
              hovered?.id === card.id
                ? 'rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col'
                : 'bg-white rounded-xl h-full w-full'
            )}
            layoutId={`card-${card.id}`}
          >
            {hovered?.id === card.id && <SelectedCard selected={hovered} />}
            <ImageComponent card={card} />
          </motion.div>
        </div>
      ))}
      <motion.div
        className={cn(
          'absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10',
          hovered?.id ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        animate={{ opacity: hovered?.id ? 0.3 : 0 }}
      />
    </div>
  )
}

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <Image
      //   layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      height={500}
      width={500}
      className={cn(
        'object-contain object-top inset-0 h-auto w-full transition duration-200'
      )}
      alt="thumbnail"
    />
  )
}

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 100,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
        className="relative px-8 pb-4 z-[70]"
      >
        {selected?.content}
      </motion.div>
    </div>
  )
}
