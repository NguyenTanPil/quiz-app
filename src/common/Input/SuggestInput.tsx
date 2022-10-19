import React, { useState, useEffect, useRef } from 'react';
import { QUIZ_APP_CONSTANTS } from '../../utils/constants';
import { DropdownSelectedButton } from '../Button';
import useDebounce from '../hooks/useDebounce';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { DropdownItem, DropdownList } from '../Styles';
import { SuggestInputContainer } from './InputStyles';
import OriginInput from './OriginInput';

type SuggestInputProps = {
  name: string;
  placeholder: string;
  suggestList: string[];
  setValue(value: string): void;
};

const SuggestInput = ({ name, placeholder, suggestList, setValue }: SuggestInputProps) => {
  const [input, setInput] = useState('');
  const [suggests, setSuggests] = useState<string[]>([QUIZ_APP_CONSTANTS.COMMON.suggestNotFound]);
  const [isShowListSuggest, setIsShowListSuggest] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement>();
  const debouncedValue = useDebounce<string>(input, QUIZ_APP_CONSTANTS.COMMON.debounceSeconds);

  useOnClickOutside(contentRef, () => setIsShowListSuggest(false));

  const handleClick = (value: string) => {
    if (value === QUIZ_APP_CONSTANTS.COMMON.suggestNotFound) return;

    setValue(value);
    setInput(value);
    setIsShowListSuggest(false);
  };

  useEffect(() => {
    const regex = new RegExp(debouncedValue, 'gi');
    const newSuggestList = suggestList.filter((item: string) => item.search(regex) !== -1);

    if (debouncedValue === '' || newSuggestList.length === QUIZ_APP_CONSTANTS.COMMON.emptyArrayLength) {
      setSuggests([QUIZ_APP_CONSTANTS.COMMON.suggestNotFound]);
    } else {
      setSuggests(newSuggestList);
    }
  }, [debouncedValue]);

  return (
    <SuggestInputContainer ref={contentRef}>
      <OriginInput
        type="search"
        name={name}
        value={input}
        placeholder={placeholder}
        setValue={(value) => setInput(value)}
        onFocus={() => setIsShowListSuggest(true)}
      />
      {isShowListSuggest && (
        <DropdownList>
          {suggests.map((item) => (
            <DropdownItem key={item} onClick={() => handleClick(item)}>
              <DropdownSelectedButton>{item}</DropdownSelectedButton>
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </SuggestInputContainer>
  );
};

export default SuggestInput;
