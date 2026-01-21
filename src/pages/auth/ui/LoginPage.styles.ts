export const loginStyles = {
  wrapper: `
    w-screen h-screen
    flex items-center justify-center
    bg-cover bg-no-repeat
    overflow-x-hidden
  `,

  content: `
    flex flex-col items-center
    justify-center
    gap-[26px]
    w-full h-full
    px-6 py-12
    md:px-[468px] md:py-[290px]
  `,

  logo: `
    w-[192px] h-[36px]
  `,

  loginSection: `
    flex flex-col items-center
    gap-[61px]
  `,

  greeting: `
    typo-body-2
    text-gray-900
    text-center
    w-[215px]
  `,

  kakaoButton: `
    transition
    hover:opacity-90
  `,

  kakaoImage: `
    w-[300px] h-[45px]
    object-cover
  `,
};
