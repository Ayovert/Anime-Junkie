import useProducts from "../../shared/hooks/useProducts";
import { useAppDispatch, useAppSelector } from "../../shared/redux/store";
import CustomCheckboxGroup from "../../shared/reuse/CustomCheckboxGroup";
import CustomRadioButton from "../../shared/reuse/CustomRadioButton";
import Search from "../../shared/reuse/SearchBar";
import { categories, sortOptions } from "../../shared/util/data";
import { setProductParams } from "./productSlice";

export default function FiltersSection(){
    const dispatch = useAppDispatch();
    const { categories, animes } = useProducts();


  

    const { productParams } = useAppSelector((state) => state.product);

    return(

        <div className="w-full flex flex-wrap justify-between items-center md:block">
        <div className="my-2 w-5/12 md:w-full">
        <h2 className="text-2xl my-2">Filters</h2>

      {/** <div className="my-4">
        <Search/>
        </div>*/}  

       
          <CustomRadioButton
            options={sortOptions}
            selectedValue={productParams.orderBy}
            onChange={(e) =>
              dispatch(setProductParams({ orderBy: e.target.value }))
            }
          />
        </div>

        {/**
         *
         */}
        <div className="my-12 w-5/12 md:w-full">
        <p className="font-bold my-3">Categories</p>
          <CustomCheckboxGroup
            items={categories}
            checked={productParams.categories}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ categories: items }))
            }
          />
        </div>


        <div className="my-12 w-5/12 md:w-full">
        <p className="font-bold my-3">Anime</p>
          <CustomCheckboxGroup
            items={animes}
            checked={productParams.animes}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ animes: items}))
            }
          />
        </div>
      </div>
    );
}