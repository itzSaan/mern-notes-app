

const TabletHeader = () => {

  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  return (
    <div className="xl:hidden bg-[#f4f5f9] dark:bg-[#222531] dark:text-neutral-300 border-b dark:border-b dark:border-[#222531] px-4 md:px-6 py-2 md:py-3 flex items-center gap-4 col-span-4 self-start">
      <img src={ prefersDarkScheme.matches ? "/notes-logo-dark.svg" : "/notes-logo.svg"} alt="Notes" className="w-28 shrink-0" />
    </div>
  )
}

export default TabletHeader