import clsx from "clsx";

export function SectionIntro({
  title,
  id,
  eyebrow,
  description, // Añadido
  children,
  smaller = false,
  vertical = false,
  className = "py-6 md:py-8 my-4 md:my-6",
  ...props
}) {
  return (
    <div {...props} className={className}>
      {eyebrow && (
        <span
          className={clsx("mb-3 block font-display text-lg font-semibold")}
        >
          {eyebrow}
        </span>
      )}

      {vertical && children ? (
        <>
          <h2
            id={id}
            className={clsx(
              "scroll-top",
              "text-[#202124] font-extrabold",
              smaller ? "text-2xl" : "text-5xl"
            )}
          >
            {title}
          </h2>
          {description && (
            <p className="text-[#202124] text-lg font-medium leading-9 mt-1">
              {description}
            </p>
          )}
          <div className={clsx("mt-1 text-lg text-neutral-300")}>
            {children}
          </div>
        </>
      ) : children ? (
        <div className="grid md:grid-cols-2 w-full gap-8 md:gap-14">
          <h2
            id={id}
            className={clsx(
              "scroll-top",
              "text-[#202124] font-extrabold",
              smaller ? "text-2xl" : "text-5xl"
            )}
          >
            {title}
          </h2>
          {description && (
            <p className="text-[#202124] text-lg font-medium leading-9 mt-1">
              {description}
            </p>
          )}
          <div className={clsx("text-lg text-neutral-300")}>{children}</div>
        </div>
      ) : (
        <>
          <h2
            id={id}
            className={clsx(
              "scroll-top",
              "text-[#202124] font-extrabold ",
              smaller ? "text-2xl" : "text-5xl"
            )}
          >
            {title}
          </h2>
          {description && (
            <p className="text-[#202124] text-lg font-medium leading-9 mt-1">
              {description}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default SectionIntro;
