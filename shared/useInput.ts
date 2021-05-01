import { useState, useCallback } from 'react';

// input 데이터를 다루는 custom hook
export default (initialValue = null ) => {
  const [value, setValue] = useState<string>(initialValue);
  
  const handler = ((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  });

  return [value, setValue, handler];
};