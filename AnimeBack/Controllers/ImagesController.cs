using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AnimeBack.DTOs;
using AnimeBack.Entities;
using AnimeBack.Helpers;
using AnimeBack.Middleware;
using AnimeBack.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AnimeBack.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImagesController : BaseController
    {
        private readonly DataContext _context;
        private readonly ImageService _imageService;


        private readonly ILogger<ExceptionMiddleware> _logger;

        public ImagesController(DataContext context, ImageService imageService, ILogger<ExceptionMiddleware> logger)
        {
            _context = context;
            _imageService = imageService;
            _logger = logger;
        }

         [HttpGet]
        public async Task<ActionResult> GetImages()
        {
          var images = await _context.ProductImages.ToListAsync();

            var imageResponse = new List<ProductImageDTO>();
            

            imageResponse = images.Select(item => new ProductImageDTO{
                PublicId = item.PublicId,
                ProductId = item.ProductId,
                PictureUrl = item.PictureUrl,
            
            }).ToList();

            return Ok(imageResponse);
        }

        [HttpGet("{productId}", Name = "GetProductImage")]
        public async Task<ActionResult<ProductDTO>> GetProductImage(int productId)
        {
            try 
            {
                var images = await _context.ProductImages.Where(i => i.ProductId == productId)
                .ToListAsync();

                if(images == null)
                {
                    return NotFound();
                }

                var imageResponse = new List<ProductImageDTO>();
            

            imageResponse = images.Select(item => new ProductImageDTO{
                PublicId = item.PublicId,
                ProductId = item.ProductId,
                PictureUrl = item.PictureUrl,
            
            }).ToList();

            return Ok(imageResponse);
            }
            catch(Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return StatusCode(500);
            }

        }



        [HttpPost]
        public async Task<ActionResult> AddImage([FromForm] AddImageDTO imageDto)
        {

            if(imageDto.File == null && imageDto.Files == null)
            {
                return BadRequest(new ProblemDetails { Title = "Problem adding image. Please upload at least one image" });
            }
            try
            {
                var utilMethods = new UtilMethods();
                var productImages = new List<ProductImage>();


                var product = await _context.Products
                 .Include(i => i.ProductImages)
                 .FirstOrDefaultAsync(p => p.Id == imageDto.productId);

                if (product == null) return NotFound(new ProblemDetails { Title = "Product not found" });

                var category = utilMethods.GetCategory(product.CategoryId);

                

                if (imageDto.File != null)
                {


                    var imageResult = await _imageService.AddImageAsync(imageDto.File, category);
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

                if (imageDto.Files != null && imageDto.Files.Count > 0)
                {

                    foreach (var file in imageDto.Files)
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

                            //productImages.Add(productImage);
                
                            product.ProductImages.Add(productImage);
                            // product.PictureUrl = imageResult.SecureUrl.ToString();
                            //  product.PublicId = imageResult.PublicId; 
                        }
                    }

                    //product.ProductImages = productImages;

                }
                var result = await _context.SaveChangesAsync() > 0;
                if (result) return Ok();


                return BadRequest(new ProblemDetails { Title = "Problem adding image" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message} Problem getting images");
                return StatusCode(500);
            }




        }

        [HttpDelete("{publicId}")]
        public async Task<ActionResult> DeleteImage(string publicId)
        {
            /*var product = await _context.Products
            .Include(i => i.ProductImages)
            .FirstOrDefaultAsync(p => p.Id == productId);

            if (product == null) return NotFound(new ProblemDetails { Title = "Product not found" });*/

            


            var productImage = await _context.ProductImages.FirstOrDefaultAsync(i => i.PublicId == publicId);

            

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


            _context.ProductImages.Remove(productImage);

           


            var result = await _context.SaveChangesAsync() > 0;
            if (result){
                 var productImages = await _context.ProductImages.Where(i => i.ProductId == productImage.ProductId).ToListAsync();
                 return Ok(productImages);
            }
                


            return BadRequest(new ProblemDetails { Title = "Problem deleting image" });


        }

    }
}