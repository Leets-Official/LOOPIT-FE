export const signupStyles = {
  form: `
    flex min-h-screen w-full justify-center bg-white overflow-x-hidden
  `,
  container: `
    flex w-full max-w-[1440px] flex-col items-center /* mobile */
  px-6 pb-24

  /* desktop */
  md:px-[120px] md:pb-[258px]
  `,
  headerSection: `
  flex flex-col items-center gap-[10px]
  w-full bg-green-50  /* mobile */
  px-6 py-10

  /* desktop */
  md:px-[309px] md:py-[61px]
`,

  header: `
flex flex-col items-center gap-[16px]
  md:flex-row md:gap-[35px]
  `,
  logo: `
    h-[36px] w-[192px]
  `,
  headerText: `
    flex flex-col gap-[8px]
  `,
  title: `
    typo-title-3 text-black
  `,
  subtitle: `
    typo-body-1 text-black
  `,
  contentSection: `
    mt-[80px] w-full
  `,
contentWrapper: `
  flex w-full flex-col items-start gap-[67px]

  /* desktop only */
  md:w-[1200px]
`,
  profileSection: `
    flex h-[214px] w-full flex-col gap-[16px]
  `,
  sectionLabel: `
    typo-body-2 text-black
  `,
  profilePicker: `
    flex w-full justify-center
  `,
  profileImageWrap: `
    relative h-[182px] w-[182px] cursor-pointer
  `,
  profileLarge: `
    w-[182px] h-[182px]
  `,
  profileBadge: `
    absolute bottom-0 right-0 flex h-[40px] w-[40px] items-center justify-center rounded-full
    border border-[var(--color-gray-300)] bg-white
  `,
  fieldSection: `
    flex w-full flex-col gap-[16px]
  `,
 submitSection: `
  mt-[127px] flex w-full justify-center
  md:justify-end
`,

submitButton: `
  w-full max-w-[286px]
`,
};
