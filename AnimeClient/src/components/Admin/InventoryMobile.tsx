import { Product } from "../../shared/model/product";
import InventoryButton from "./InventoryButton";

interface Props{
    selectProduct:(product : Product) => void;
    deleteProduct: ( id : number) => void;
    products: Product[];
    loading: boolean;
    target: number;
}
export default function InventoryMobile({selectProduct, deleteProduct, products, loading, target}:Props){
    return(
     
        <div className="block md:hidden">
            {products.map((product) => (
                <div key={product.id} className="p-4 border-b-2">
                      <div className="flex justify-between items-center my-3 border rounded-lg p-2 ">
                 <span className="font-bold"># {product.id}</span>
                <InventoryButton deleteProduct={deleteProduct} selectProduct={selectProduct} product={product} loading={loading} target={target} />
             </div>
     
             
             <div className="flex flex-col ">
             <div className="flex justify-between items-center">
             <div className="flex items-center">
     
     <img src={product.pictureUrl} alt={product.name} className="h-12 w-14 mr-5"/>
    
     </div>

     <h4 className="">{product.name}</h4>
     <span className="font-bold">N{product.price}</span>
     
             </div>
     
             <div className="flex justify-between items-center text-right">
             <span className="my-3 text-slate-400">{product.category}</span>
                 
                 <span>Qty: {product.quantityInStock}</span>
               </div>
     
             </div>
                </div>
               
            ))}
       

       
    </div>
  
    )
}