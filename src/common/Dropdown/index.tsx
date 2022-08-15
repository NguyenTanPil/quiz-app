import React, { useState, useRef } from 'react';
import {
  Container,
  DropdownItem,
  DropdownList,
  SelectedValue,
} from './DropdownStyles';
import { RiArrowDropDownFill } from 'react-icons/ri';
import { DropdownSelectedButton } from '../Button';
import useOnClickOutside from '../../utils/useOnClickOutside';

type DropdownProps = {
  values: string[];
};

const Dropdown = ({ values }: DropdownProps) => {
  const [selectedValue, setSelectedValue] = useState(values[0]);
  const [isShow, setIsShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, () => setIsShow(false));

  return (
    <Container ref={dropdownRef}>
      <SelectedValue>
        <DropdownSelectedButton onClick={() => setIsShow((prev) => !prev)}>
          {selectedValue}
          <RiArrowDropDownFill />
        </DropdownSelectedButton>
      </SelectedValue>
      {isShow && (
        <DropdownList>
          {values.map((value) => (
            <DropdownItem
              key={value}
              selected={selectedValue === value}
              onClick={() => {
                setIsShow(false);
                setSelectedValue(value);
              }}
            >
              <DropdownSelectedButton>{value}</DropdownSelectedButton>
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </Container>
  );
};

export default Dropdown;
