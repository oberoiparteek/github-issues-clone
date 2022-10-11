import { useCallback, useEffect, useRef, useState } from "react";
import useIntersected from "./useIntersected";

const useInfinteScrolling = (loadData, startPage, batchSize) => {
  const [page, setPage] = useState(startPage);
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [error, setError] = useState('');
  const loaderRef = useRef(loadData);


  const {element, setElement} = useIntersected(loaderRef);

  const loadIssuesHandler = useCallback(() => {
    setLoading(true);
    loadData(page, batchSize,setError)
      .then((res) => {
        setDataList([...dataList, ...res]);
        setPage((page) => page + 1);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, [dataList, batchSize, loadData, page]);
  
  useEffect(() => {
    loaderRef.current = loadIssuesHandler;
  }, [loadIssuesHandler]);

  return {  setElement, loading, dataList,error };
};

export default useInfinteScrolling;
