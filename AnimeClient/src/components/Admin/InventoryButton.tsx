import { Product } from "../../shared/model/product"
import ButtonCustom from "../../shared/reuse/ButtonCustom";
import { ReactComponent as EditIcon } from "../../assets/images/icons/editIcon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/images/icons/deleteIcon.svg"

interface Props{
    selectProduct:(product : Product) => void;
    deleteProduct: ( id : number) => void;
    product: Product;
    loading: boolean;
    target: number;
}

export default function InventoryButton({selectProduct, deleteProduct, product, loading, target}:Props){
    return(
        <div className="flex justify-around">
        <ButtonCustom
        onClick={() => selectProduct(product)}  
        buttonClass={ ` ${`bg-none hover:!bg-gray-100 focus:!bg-gray-100 focus:shadow-lg active:bg-gray-100 active:shadow-lg  text-white` } flex justify-between`}
        logoClass="fill-blue-700"

        Logo={EditIcon}
        name=""
        />
        <ButtonCustom
            loading={loading && target === product.id}
            onClick={() => deleteProduct(product.id)}
            buttonClass={`${`bg-none hover:!bg-gray-100 focus:!bg-gray-100 focus:shadow-lg active:bg-gray-100 active:shadow-lg  text-white` } flex justify-between`}
            logoClass="fill-red-700"
            Logo={DeleteIcon}
            name=""
        />
        </div>
    )
}