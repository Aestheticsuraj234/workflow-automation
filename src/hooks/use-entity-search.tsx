import { PAGINATION } from "@/config/constants";
import {useEffect , useState} from "react";


interface UseEntitySearchProps<T extends {
  search:string;
  page:number;
}> {
  params: T;
  setParams: (params: T) => void;
  debounceMs?: number;
}


export function useEntitySearch<T extends {search:string; page:number;}>( {params , setParams , debounceMs =500}: UseEntitySearchProps<T>) {
  const [localSearchValue , setLocalSearchValue] = useState(params.search);

  useEffect(()=>{
    if(localSearchValue === "" && params.search !== ""){
      setParams({
        ...params,
        search: "",
        page:PAGINATION.DEFAULT_PAGE
      });
      return;
    }

    const timer = setTimeout(()=>{
      if(localSearchValue !== params.search){
        setParams({
          ...params,
          search: localSearchValue,
          page:PAGINATION.DEFAULT_PAGE
        });
      }
    },debounceMs);
    return ()=>clearTimeout(timer);
  },[localSearchValue, params, setParams, debounceMs])


  useEffect(()=>{
    setLocalSearchValue(params.search);
  },[params.search])

  return {
    searchValue: localSearchValue,
    onSearchChange: setLocalSearchValue
  };

}