using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using AnimeBack.DTOs;
using AnimeBack.DTOs.Product;
using AnimeBack.Entities;
using AnimeBack.Extensions;
using AnimeBack.Helpers;
using AnimeBack.Middleware;
using AnimeBack.RequestHelpers;
using AnimeBack.Services;
using AutoMapper;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AnimeBack.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : BaseController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;


        private readonly ILogger<ExceptionMiddleware> _logger;

        public ProductsController(DataContext context, IMapper mapper, ImageService imageService, ILogger<ExceptionMiddleware> logger)
        {
            _context = context;
            _mapper = mapper;
            _imageService = imageService;
            _logger = logger;
        }


        [HttpGet]
        public async Task<ActionResult<List<ProductDTO>>> GetProducts([FromQuery] ProductParams productParams)
        {
            try
            {
                var query = _context.Products
              //  .Include(i => i.ProductImages)
            .Sort(productParams.OrderBy)
            .Search(productParams.searchTerm)
            .Filter(productParams.Categories)
            .AsQueryable();

            

           // Console.WriteLine(productImages.ToString());


                //   var products = await query.ToListAsync();

                var productsList = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

                Response.AddPaginationHeader(productsList.MetaData);


                //var products = _context.Products
                // .ToList();

                var products = new List<ProductDTO>();

              

                foreach (var product in productsList)
                {
                    
                    var prod = MapProductDTO(product);

                    products.Add(prod);

                }




                //productsDto = MapProductsDTO(products);
                return Ok(products);
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return StatusCode(500);
            }

        }




        [HttpGet("{Id}", Name = "GetProduct")]
        public async Task<ActionResult<ProductDTO>> GetProduct(int Id)
        {
            try
            {

                var product = await _context.Products
                .FirstOrDefaultAsync(p => p.Id == Id);

                if (product == null)
                {
                    return NotFound();
                }

                var productDto = MapProductDTO(product);

                return Ok(productDto);
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpGet("filters")]

        public async Task<IActionResult> GetFilters()
        {
            var categoryList = await _context.Products.Select(p => p.CategoryId).Distinct().ToListAsync();

            var categories = new List<string>();

            foreach (var category in categoryList)
            {
                CategoryModel category1;

                var catId = category.ToString();

                var catExists = Enum.TryParse(catId, true, out category1) && Enum.IsDefined(typeof(CategoryModel), category1);

                var catStr = category1.ToString();

                if (!catExists)
                {
                    catStr = "Misc";
                }


                categories.Add(catStr);

            }

            return Ok(new { categories });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]

        public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDTO productDto)
        {
            var utilMethods = new UtilMethods();
            var category = utilMethods.GetCategory(productDto.CategoryId);
            var product = _mapper.Map<Product>(productDto);
            var productImages = new List<ProductImage>();

            try
            {
                if (productDto.File != null)
                {


                    var imageResult = await _imageService.AddImageAsync(productDto.File, category);



                    if (imageResult.Error != null)
                    {
                        return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
                    }

                    product.PictureUrl = imageResult.SecureUrl.ToString();
                    product.PublicId = imageResult.PublicId;


                }


                if (productDto.Files.Count > 0)
                {

                    foreach (var file in productDto.Files)
                    {
                        var imageResult = await _imageService.AddImageAsync(file, category);



                        if (imageResult.Error != null)
                        {
                            _logger.LogError($"mini Images error: {imageResult.Error.Message}");
                        }
                        else
                        {

                            var productImage = new ProductImage
                            {
                                PictureUrl = imageResult.SecureUrl.ToString(),
                                PublicId = imageResult.PublicId
                            };



                            productImages.Add(productImage);

                            //product.ProductImages.Add(productImage);
                            // product.PictureUrl = imageResult.SecureUrl.ToString();
                            //  product.PublicId = imageResult.PublicId; 
                        }


                    }

                    product.ProductImages = productImages;

                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
            }






            _context.Products.Add(product);


            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetProduct", new { Id = product.Id }, product);

            return BadRequest(new ProblemDetails { Title = "Problem creating new product" });
        }


        [Authorize(Roles = "Admin")]
        [HttpPut]

        public async Task<ActionResult<Product>> UpdateProduct([FromForm] UpdateProductDTO productDto)
        {

            var utilMethods = new UtilMethods();
            var product = await _context.Products.Include(i => i.ProductImages).FirstOrDefaultAsync(p => p.Id == productDto.Id);
            var category = utilMethods.GetCategory(productDto.CategoryId);

            if (product == null) return NotFound();

            _mapper.Map(productDto, product);

            if (productDto.File != null)
            {
                //productDto.CategoryId;

                var imageResult = await _imageService.AddImageAsync(productDto.File, category);
                if (imageResult.Error != null)
                {
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });
                }

                if (!string.IsNullOrEmpty(product.PublicId))
                {
                    await _imageService.DeleteImageAsync(product.PublicId);
                }

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }


            if (productDto.Files.Count > 0)
            {

                foreach (var file in productDto.Files)
                {
                    var imageResult = await _imageService.AddImageAsync(file, category);



                    if (imageResult.Error != null)
                    {
                        _logger.LogError($"mini Images error: {imageResult.Error.Message}");
                    }
                    else
                    {

                        var productImage = new ProductImage
                        {
                            PictureUrl = imageResult.SecureUrl.ToString(),
                            PublicId = imageResult.PublicId
                        };



                        // productImages.Add(productImage);

                        product.ProductImages.Add(productImage);
                        // product.PictureUrl = imageResult.SecureUrl.ToString();
                        //  product.PublicId = imageResult.PublicId; 
                    }


                }



            }

            var result = await _context.SaveChangesAsync() > 0;
            if (result) {
                 var productRes = MapProductDTO(product);
                return Ok(productRes);
                }

            return BadRequest(new ProblemDetails { Title = "Problem updating product" });
        }


        [Authorize(Roles = "Admin")]
        [HttpDelete("{Id}")]

        public async Task<ActionResult<Product>> DeleteProduct(int Id)
        {
            var product = await _context.Products.Include(i => i.ProductImages).FirstOrDefaultAsync(p => p.Id == Id);

            if (product == null) return NotFound();


            if (!string.IsNullOrEmpty(product.PublicId))
            {
                try
                {
                    await _imageService.DeleteImageAsync(product.PublicId);
                }
                catch (Exception ex)
                {
                    _logger.LogError($"error deleting image {product.PublicId} + \n {ex.Message} ");
                }

            }

            if (product.ProductImages.Count > 0)
            {
                foreach (var image in product.ProductImages)
                {
                    try
                    {
                        await _imageService.DeleteImageAsync(image.PublicId);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError($"error deleting image {image.PublicId} + \n {ex.Message} ");
                    }

                }
            }

            _context.Products.Remove(product);

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();


            return BadRequest(new ProblemDetails { Title = "Problem deleting product" });

        }


        [HttpDelete("deleteImage")]
        public async Task<ActionResult> DeleteImage(int productId, string publicId)
        {
            var product = await _context.Products
            .Include(i => i.ProductImages)
            .FirstOrDefaultAsync(p => p.Id == productId);

            if (product == null) return NotFound(new ProblemDetails { Title = "Product not found" });




            // var productImage = await _context.ProductImages.FirstOrDefaultAsync(i => i.PublicId == publicId);

            var productImage = product.ProductImages.FirstOrDefault(i => i.PublicId == publicId);


            if (productImage == null) return NotFound(new ProblemDetails { Title = "Image not found" });







            try
            {
                var imageResult = await _imageService.DeleteImageAsync(productImage.PublicId);

                if (imageResult.Error != null)
                {
                    _logger.LogError($"mini Images error: {imageResult.Error.Message}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"error deleting image {productImage.PublicId} + \n {ex.Message} ");
            }


            //_context.ProductImages.Remove(productImage);

            product.ProductImages.Remove(productImage);




            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                var productImages = product.ProductImages.Where(i => i.ProductId == productImage.ProductId).ToList();

                var imageResponse = new List<ProductImageDTO>();


                imageResponse = productImages.Select(item => new ProductImageDTO
                {
                    PublicId = item.PublicId,
                    ProductId = item.ProductId,
                    PictureUrl = item.PictureUrl,

                }).ToList();

                return Ok(imageResponse);
            }



            return BadRequest(new ProblemDetails { Title = "Problem deleting image" });


        }







        private ProductDTO MapProductDTO(Product product)
        {
            //var prods = new List<ProductDTO>();


            string category1 = "Misc";


            var category = Enum.GetName(typeof(CategoryModel), product.CategoryId);

            var prod = new ProductDTO
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Category = category != null ? category : category1,
                QuantityInStock = product.QuantityInStock,
                Price = product.Price,
                PictureUrl = product.PictureUrl,
                DiscountId = product.DiscountId,
            };





            return prod;
        }

        private async Task<ActionResult<ImageUploadResult>> AddProductImageAsync(CreateProductDTO productDto)
        {
            var utilMethods = new UtilMethods();
            var category = utilMethods.GetCategory(productDto.CategoryId);
            var imageResult = await _imageService.AddImageAsync(productDto.File, category);

            return imageResult;
        }
    }
}