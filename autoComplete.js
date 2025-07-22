import React, { useState, useEffect } from 'react';

const Search = () => {
  const [searchdata, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputFocus, setInputFocus] = useState(false);
  const fetchData = (searchData) => {
    fetch(`https://dummyjson.com/recipes/search?q=${searchData}`)
      .then((result) => {
        return result.json();
      })
      .then((jsonData) => {
        setData(jsonData.recipes);
        console.log(jsonData.recipes);
      })
      .catch((error) => {
        console.log('Fetch data error', error);
      });
  };

  useEffect(() => {
    //Debouncing
    const timer = setTimeout(fetchData(inputValue), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  const onChangeHandle = (e) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  };

  const onFocusHandle = () => {
    setInputFocus(true);
  };
  const onBlurHandle = () => {
    setInputFocus(false);
  };

  return (
    <>
      <div>Search Data</div>
      <input
        className="serachInput"
        tyepe="input"
        onChange={(e) => onChangeHandle(e)}
        onFocus={() => onFocusHandle()}
        onBlur={() => onBlurHandle()}
      />
      {inputFocus && (
        <div className="searchContainer">
          {searchdata?.map((record, index) => (
            <div key={index} className="record">
              {record.name}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Search;
