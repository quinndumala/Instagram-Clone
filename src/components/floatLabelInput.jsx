import { useCallback, useState } from "react";

export default function FloatLabelInput({ name, type, label, onChange }) {
  const [active, setActive] = useState(false);

  const handleActive = (e) => {
    setActive(!!e.target.value);

    onChange(e);
  };

  return (
    <div className="w-full relative rounded mb-2 cursor-text h-11 border border-gray-primary">
      <input
        className={[
          "outline-none w-full rounded bg-gray-600 px-2 mr-3 h-1 text-sm text-gray-base transition-all duration-200 ease-in-out",
          active ? "pt-6 pb-3" : "py-5",
        ].join(" ")}
        id={name}
        name={name}
        type={type}
        onChange={handleActive}
      />
      <label
        className={[
          "cursor-text absolute top-0 left-0 flex items-center text-gray-base text-opacity-60 px-2 transition-all duration-200 ease-in-out",
          active ? "pt-0 text-tiny" : "py-2 text-sm",
        ].join(" ")}
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
}
