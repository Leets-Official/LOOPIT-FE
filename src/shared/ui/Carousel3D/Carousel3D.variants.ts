import { tv } from 'tailwind-variants';

export const carousel3DVariants = tv({
  slots: {
    container: ['relative', 'w-full', 'h-full', 'flex', 'items-center', 'justify-center', 'overflow-hidden'],

    wrapper: [
      'w-full',
      'h-full',
      '[&_.swiper]:h-full',
      '[&_.swiper]:w-full',
      '[&_.swiper]:overflow-visible',
      '[&_.swiper-wrapper]:items-center',
      '[&_.swiper-slide]:flex',
      '[&_.swiper-slide]:items-center',
      '[&_.swiper-slide]:justify-center',
      '[perspective:1200px]',
      '[&_.swiper-slide-shadow-left]:bg-gradient-to-r',
      '[&_.swiper-slide-shadow-left]:from-black/50',
      '[&_.swiper-slide-shadow-right]:bg-gradient-to-l',
      '[&_.swiper-slide-shadow-right]:from-black/50',
    ],

    slide: [
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'gap-6',
      'px-10',
      'py-16',
      'w-full',
      'h-full',
      'min-h-[320px]',
      'bg-gradient-to-br',
      'from-gray-900/90',
      'to-gray-800/70',
      'backdrop-blur-xl',
      'border',
      'border-gray-700/30',
      'rounded-(--radius-l)',
      'shadow-2xl',
      'shadow-black/30',
      'transition-all',
      'duration-500',
    ],

    iconWrapper: [
      'flex',
      'items-center',
      'justify-center',
      'w-24',
      'h-24',
      'rounded-full',
      'bg-gradient-to-br',
      'from-[var(--color-brand-primary)]/30',
      'to-[var(--color-brand-primary)]/10',
      'border',
      'border-[var(--color-brand-primary)]/40',
      'shadow-lg',
      'shadow-[var(--color-brand-primary)]/20',
    ],

    icon: ['w-12', 'h-12'],

    title: ['text-3xl', 'md:text-4xl', 'font-bold', 'text-white', 'text-center', 'mt-2'],

    description: ['text-lg', 'md:text-xl', 'font-medium', 'text-gray-300', 'text-center', 'max-w-[500px]'],

    imageSlide: [
      'relative',
      'w-full',
      'h-full',
      'min-h-[320px]',
      'rounded-(--radius-l)',
      'overflow-hidden',
      'shadow-2xl',
      'shadow-black/30',
    ],

    imageBackground: ['absolute', 'inset-0', 'w-full', 'h-full', 'object-cover'],

    imageOverlay: ['absolute', 'inset-0', 'bg-gradient-to-t', 'from-black/80', 'via-black/40', 'to-transparent'],

    imageContent: ['relative', 'z-10', 'flex', 'flex-col', 'items-start', 'justify-end', 'h-full', 'p-8', 'md:p-10'],

    imageTitle: ['text-2xl', 'md:text-3xl', 'font-bold', 'text-white', 'mb-2'],

    imageSubtitle: ['text-base', 'md:text-lg', 'text-white/80', 'font-medium'],

    pagination: [
      '[&_.swiper-pagination]:!bottom-4',
      '[&_.swiper-pagination-bullet]:w-3',
      '[&_.swiper-pagination-bullet]:h-3',
      '[&_.swiper-pagination-bullet]:bg-gray-600',
      '[&_.swiper-pagination-bullet]:opacity-100',
      '[&_.swiper-pagination-bullet]:transition-all',
      '[&_.swiper-pagination-bullet]:mx-1',
      '[&_.swiper-pagination-bullet-active]:bg-brand-primary',
      '[&_.swiper-pagination-bullet-active]:w-8',
      '[&_.swiper-pagination-bullet-active]:rounded-full',
    ],
  },
});
