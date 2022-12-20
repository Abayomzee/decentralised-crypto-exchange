import React, { useState, useRef } from "react";
//
import { Wrapper, Dropdown, DropdownItem } from "./style";
//
import Typography from "Components/Atom/Typography";
import { AnimatePresence } from "framer-motion";
import { animate_slideUp } from "Styles/Base/Animation";
import useOnClickOutside from "Utils/Hooks/useOnClickOutside";

// Types
interface NetworkOptionProps {
  value: string;
  label: string;
  id: string;
  chainId: string;
  icon: JSX.Element;
}
interface Props {
  onOptionChange?: (network: NetworkOptionProps) => void;
  value: string;
  options?: Array<NetworkOptionProps>;
}
// Main component
const CustomSelect: React.FC<Props> = (props) => {
  // Refs
  const dropdownef = useRef<any>();

  // State
  const [show, setShow] = useState<boolean>(false);

  //    Hooks
  useOnClickOutside(dropdownef, () => setShow(false));

  // Props
  const { onOptionChange, value, options } = props;

  // Methods
  const handleDropdownShow = (e: any) => {
    e.stopPropagation();
    setShow(!show);
  };

  // Data to render
  return (
    <Wrapper onClick={handleDropdownShow}>
      <Typography as="p" className="paragraph-3" text={value} />
      <AnimatePresence>
        {show && (
          <Dropdown
            variants={animate_slideUp.variants}
            exit={animate_slideUp.variants.hidden}
            transition={animate_slideUp.transition}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            ref={dropdownef}
          >
            {options?.map((option) => (
              <DropdownItem
                key={option.id}
                onClick={() => onOptionChange!(option)}
              >
                {option.icon}
                <Typography
                  as="span"
                  className="paragraph-2"
                  text={option.label}
                />
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default CustomSelect;
