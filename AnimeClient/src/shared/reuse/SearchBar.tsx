
import { useEffect, useState } from 'react';


import { useAppSelector, useAppDispatch } from '../redux/store';
import { setProductParams } from '../../components/Shop/productSlice';
import { ReactComponent as SearchIcon } from '../../assets/images/icons/searchIcon.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useProducts from '../hooks/useProducts';

export default function Search(){
  const {productParams} = useProducts();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location : any = useLocation();

    const [searchTerm , setSearchTerm] = useState(productParams.searchTerm);

    function debounce<T extends Function>(func : T, timeout = 300){
      let timer : any;
      
      return (...args:any) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func(...args) }, timeout);
      };
    }

    const debouncedSearch = debounce((event:any) =>{
        dispatch(setProductParams({searchTerm: event.target.value}));

      //  navigate('/shop');
    }, 1000)


    useEffect(() => {
      if(location.pathname !== "/shop"){
        setSearchTerm("");
      }
    },[dispatch,location.pathname])


    return(
      <div className="flex justify-center items-center relative w-full">
  <div className="w-full">
    <div className="input-group relative flex flex-wrap items-center w-full rounded-2xl ">
    <span className="input-group-text flex items-center ml-2 py-3 px-3 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded-xl absolute top-2 z-[1] " id="basic-addon2">
        <SearchIcon className='h-4 opacity-50'/>
      </span>
      <input type="search" className="form-control relative flex-auto min-w-0 block w-full pr-2 pl-8 py-4 text-base font-normal text-gray-700 bg-slate-200 bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none rounded-lg ml-2" placeholder="Clothes,Accessories and more ..." aria-label="Search" aria-describedby="button-addon2"
      value={searchTerm || ''}
      onChange= {event =>{
          setSearchTerm(event.target.value);
          debouncedSearch(event);
      }}
      />

{location.pathname !== '/shop' && (
                     <Link to="/shop" className={`${!productParams.searchTerm && ' pointer-events-none' } w-full text-center mr-2`}>
                     <h4 className="text-base w-full md:w-fit md:absolute right-1 top-1.5 px-4 py-3 mx-2 my-4 md:m-0 text-white bg-black rounded-lg">
                         Search
                     </h4>
                     </Link>
                  )}
      
    </div>
  </div>
</div>
    )
}

