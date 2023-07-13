import useProducts from "../../shared/hooks/useProducts";
import { useAppDispatch } from "../../shared/redux/store";
import AppPagination from "../../shared/reuse/AppPagination";
import ButtonCustom from "../../shared/reuse/ButtonCustom";
import { currencyFormat } from "../../shared/util/util";
import { removeProduct, setProductParams } from "../Shop/productSlice";
import { ReactComponent as EditIcon } from "../../assets/images/icons/editIcon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/images/icons/deleteIcon.svg";
import { useState } from "react";
import ProductForm from "./ProductForm";
import { Product } from "../../shared/model/product";
import agent from "../../shared/api/agent";
import InventoryMobile from "./InventoryMobile";
import InventoryButton from "./InventoryButton";

export default function InventoryPage() {
  const { products, metaData } = useProducts();

  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);

  function handleDeleteProduct(id: number) {
    setLoading(true);
    setTarget(id);
    agent.Admin.deleteProduct(id)
      .then(() => dispatch(removeProduct(id)))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  function handleSelectProduct(product: Product) {
    setSelectedProduct(product);
    setEditMode(true);
  }

  function cancelEdit() {
    if (selectedProduct) setSelectedProduct(undefined);
    setEditMode(false);
  }

  if (editMode)
    return <ProductForm product={selectedProduct} cancelEdit={cancelEdit} />;

  return (
    <>
      <div className="w-full my-5 md:my-24 px-5 lg:px-20">
        <div className="flex justify-between mb-4">
          <h4 className="p-4 text-2xl">Inventory</h4>
          <ButtonCustom
            onClick={() => setEditMode(true)}
            className="m-2"
            name="Create"
            buttonClass={` ${`bg-red-700 hover:!bg-red-800 focus:!bg-red-700 focus:shadow-lg active:bg-red-900 active:shadow-lg  text-white`} flex justify-between`}
          />
        </div>
        <div className="bg-white">
          <table
            className="lg:min-w-[650px] w-full hidden md:table"
            aria-label="inventory table"
          >
            <thead>
              <tr>
                <td>#</td>
                <td align="left">Product</td>
                <td align="right">Price</td>
                <td align="center">Category</td>

                <td align="center">Quantity</td>
                <td align="right"></td>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="inventoryTR">
                  <th scope="row">{product.id}</th>
                  <td align="left">
                    <div className="flex items-center">
                      <img
                        src={product.pictureUrl}
                        alt={product.name}
                        className="h-12 w-14 mr-5"
                      />
                      <span>{product.name}</span>
                    </div>
                  </td>

                  <td align="right">{currencyFormat(product.price)}</td>
                  <td align="center">{product.category}</td>
                  <td align="center">{product.quantityInStock}</td>
                  <td align="right">
                    <InventoryButton
                      selectProduct={handleSelectProduct}
                      deleteProduct={handleDeleteProduct}
                      product={product}
                      loading={loading}
                      target={target}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/**mobile inventory */}

          <InventoryMobile
            selectProduct={handleSelectProduct}
            deleteProduct={handleDeleteProduct}
            loading={loading}
            target={target}
            products={products}
          />

          {/**mobile inventory */}

          {metaData && (
            <div className="pt-2">
              <AppPagination
                itemsLength={products.length}
                metaData={metaData}
                onPageChange={(page: number) =>
                  dispatch(setProductParams({ pageNumber: page }))
                }
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
