import React, { useState, useRef, useEffect } from 'react';
import { Container, DropdownItem, DropdownList, SelectedValue } from './DropdownStyles';
import { RiArrowDropDownFill } from 'react-icons/ri';
import { DropdownSelectedButton } from '../Button';
import useOnClickOutside from '../../utils/useOnClickOutside';

type DropdownProps = {
  id: string;
  activeValue: string;
  values: string[];
  handleSelected: (value: string) => void;
};

const Dropdown = ({ id, activeValue, values, handleSelected }: DropdownProps) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [isShow, setIsShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, () => setIsShow(false));

  const handleClick = (value: string) => {
    setIsShow(false);
    setSelectedValue(value);
    handleSelected(value);
  };

  useEffect(() => {
    setSelectedValue(activeValue);
  }, [activeValue]);

  return (
    <Container ref={dropdownRef} id={`${id}-dropdown`}>
      <SelectedValue>
        <DropdownSelectedButton type="button" onClick={() => setIsShow((prev) => !prev)}>
          {selectedValue}
          <RiArrowDropDownFill />
        </DropdownSelectedButton>
      </SelectedValue>
      {isShow && (
        <DropdownList>
          {values.map((value) => (
            <DropdownItem key={value} selected={selectedValue === value} onClick={() => handleClick(value)}>
              <DropdownSelectedButton>{value}</DropdownSelectedButton>
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </Container>
  );
};

export default Dropdown;
