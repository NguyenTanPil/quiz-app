import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment, { Moment } from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { BsCalendarDate } from 'react-icons/bs';
import { NoBorderButton } from '../Button';
import { DateTimePickerContainer, DisplayNoneDateTimePicker, OverrideDateTimePicker } from './InputStyles';
import OriginInput from './OriginInput';

type DateTimePickerInputProps = {
  id: string;
  initialTime?: number;
  setDateTime: (value: number) => void;
};

const DateTimePickerInput = ({ id, initialTime, setDateTime }: DateTimePickerInputProps) => {
  const [value, setValue] = useState<Moment | null>(moment());
  const dateTimePickerRef = useRef<HTMLDivElement>(null);
  const customDateTimeIconRef = useRef<HTMLDivElement>(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [minTime, setMinTime] = useState<Moment | null>(moment());

  const handleChange = (newValue: Moment | null) => {
    setValue(newValue);
    setDateTime(moment(newValue).valueOf());
  };

  useEffect(() => {
    if (isFirstRender) {
      if (initialTime) {
        setValue(moment(initialTime));
        setMinTime(moment(initialTime));
      } else {
        setMinTime(moment());
      }
    }

    setIsFirstRender(false);
  }, [initialTime]);

  useEffect(() => {
    if (!dateTimePickerRef?.current && !customDateTimeIconRef?.current) return;

    const dateTimeIconElementMUI = dateTimePickerRef?.current?.querySelector('button');

    const handleIconClick = () => {
      dateTimeIconElementMUI?.click();
    };

    customDateTimeIconRef?.current?.addEventListener('click', handleIconClick);

    return () => {
      removeEventListener('click', handleIconClick);
    };
  }, []);

  useEffect(() => {
    if (!dateTimePickerRef?.current) return;

    const amButton = document.querySelector('.MuiClock-amButton');
    const pmButton = document.querySelector('.MuiClock-pmButton');

    if (amButton && pmButton) {
      const handleAmPmButtonClick = (targetButton: HTMLElement, otherButton: HTMLElement) => {
        targetButton.style.backgroundColor = '#9852f9';
        targetButton.style.color = '#ffffff';

        otherButton.style.backgroundColor = '#ffffff';
        otherButton.style.color = '#9852f9';
      };

      const periodTime = moment(value).format('LT').slice(-2);

      if (periodTime === 'AM') {
        handleAmPmButtonClick(amButton as HTMLElement, pmButton as HTMLElement);
      } else {
        handleAmPmButtonClick(pmButton as HTMLElement, amButton as HTMLElement);
      }
    }
  }, [dateTimePickerRef?.current, value]);

  return (
    <DateTimePickerContainer>
      <DisplayNoneDateTimePicker ref={dateTimePickerRef}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateTimePicker
            value={value}
            minDateTime={minTime}
            renderInput={(params) => <TextField {...params} />}
            onChange={handleChange}
          />
        </LocalizationProvider>
      </DisplayNoneDateTimePicker>
      <OverrideDateTimePicker>
        <OriginInput value={moment(value).format('LLL')} name={id} readOnly={true} setValue={() => {}} />
        <NoBorderButton ref={customDateTimeIconRef}>
          <BsCalendarDate />
        </NoBorderButton>
      </OverrideDateTimePicker>
    </DateTimePickerContainer>
  );
};

export default DateTimePickerInput;
