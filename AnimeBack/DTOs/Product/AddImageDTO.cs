using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace AnimeBack.DTOs
{

    public class AddImageDTO
    {
        [Required]
        public int productId { get; set; }

        public string publicId { get; set; }

        public IFormFile File { get; set; }

        public IFormFileCollection Files { get; set; }


    }
}