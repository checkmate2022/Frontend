import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import 'moment/locale/ko';

function Datepicker({
  selected,
  onChange,
  customInput,
  minDate,
  maxDate,
  minTime,
  maxTime,
  filterTime,
}) {
  return (
    <div>
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        showTimeSelect
        locale={ko}
        timeIntervals={10}
        timeFormat='HH:mm'
        timeCaption='time'
        dateFormat='yyyy년 MM월 dd일 HH:mm'
        customInput={customInput}
        minDate={minDate}
        maxDate={maxDate}
        minTime={minTime}
        maxTime={maxTime}
        filterTime={filterTime}
      />
    </div>
  );
}

export default Datepicker;
