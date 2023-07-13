using System.Collections.Generic;

namespace AnimeBack.DTOs
{

        public class ProductDTO
    {
        public int Id {get; set;}
        public string Name {get; set;}
        public string Description {get; set;}
        public string Category {get; set;}

        public int QuantityInStock {get; set;}

        public long Price {get; set;}

        public int DiscountId {get; set;}
        public string PictureUrl {get; set;}
        public List<ProductImageDTO> Images {get; set;}


    }

    public class ProductImageDTO 
    {
        public int ProductId {get; set;}
        public string PublicId {get; set;}
        public string PictureUrl {get; set;}
    }
}