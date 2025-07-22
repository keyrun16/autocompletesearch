import React, { useState, useEffect } from 'react';

const Search = () => {
  const [searchdata, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputFocus, setInputFocus] = useState(false);
  const [cacheData, setCacheData] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const fetchData = (searchData) => {
    if (cacheData[searchData]) {
      console.log('from Cache', cacheData[searchData]);
      setData(cacheData[searchData]);
      return;
    }
    console.log('making API call');
    fetch(`https://dummyjson.com/recipes/search?q=${searchData}`)
      .then((result) => {
        return result.json();
      })
      .then((jsonData) => {
        setData(jsonData.recipes);
        console.log(jsonData.recipes);
        setCacheData((prev) => ({ ...prev, [searchData]: jsonData.recipes }));
      })
      .catch((error) => {
        console.log('Fetch data error', error);
      });
  };

  useEffect(() => {
    let timer;
    // if (inputValue !== '') {
    //Debouncing
    timer = setTimeout(fetchData(inputValue), 3000);
    // }

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  const onChangeHandle = (e) => {
    console.log('onChangeHandle', e.target.value);
    setInputValue(e.target.value);
  };

  const onFocusHandle = () => {
    setInputFocus(true);
  };
  const onBlurHandle = () => {
    // setInputFocus(false);
  };
  const onClickHandle = (val) => {
    console.log('in on click', val);
    setInputValue(val);
    setInputFocus(false);
  };
  const onKeyDownHandle = (e) => {
    console.log(e.key);
    if (e.key === 'ArrowUp' && selectedIndex > 0) {
      setSelectedIndex((prev) => prev - 1);
    } else if (e.key === 'ArrowDown' && selectedIndex < searchdata.length - 1) {
      setSelectedIndex((prev) => prev + 1);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      setInputValue(searchdata[selectedIndex].name);
    }
  };

  return (
    <>
      <h1>Search Data</h1>
      <div onBlur={() => onBlurHandle()}>
        <input
          className="serachInput"
          tyepe="input"
          onChange={(e) => onChangeHandle(e)}
          onFocus={() => onFocusHandle()}
          value={inputValue}
          onKeyDown={onKeyDownHandle}
        />
        {inputFocus && (
          <div className="searchContainer">
            {searchdata?.map((record, index) => (
              <div
                key={index}
                className={selectedIndex === index ? 'record active' : 'record'}
                onClick={() => onClickHandle(record.name)}
              >
                {record.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
