using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AnimeBack.Entities
{
    public class ProductImage
    {
        [Key]
        public int Id {get; set;}

        public string PictureUrl {get; set;}
        public string PublicId {get; set;}

    
        public int ProductId {get; set;}
        public Product Product {get; set;}


    }
}