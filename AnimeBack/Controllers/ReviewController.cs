using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AnimeBack.DTOs;
using AnimeBack.DTOs.Review;
using AnimeBack.Entities;
using AnimeBack.Helpers;
using AnimeBack.Middleware;
using AnimeBack.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AnimeBack.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : BaseController
    {
        private readonly DataContext _context;
        private readonly ImageService _imageService;

        private readonly IMapper _mapper;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ReviewController(DataContext context, ImageService imageService, ILogger<ExceptionMiddleware> logger, IMapper mapper)
        {
            _context = context;
            _imageService = imageService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> GetReviews()
        {
            var reviews = await _context.Reviews.ToListAsync();

            if (reviews == null)
            {
                return NotFound(new ProblemDetails { Title = "No Reviews Found" });
            }
            return Ok(reviews);
        }

        [HttpGet("{Id}", Name = "GetReview")]
        public async Task<ActionResult> GetReview(int Id)
        {

          
            
            var review = await _context.Reviews
            .FirstOrDefaultAsync(p => p.Id == Id);


            if (review == null)
            {
                return NotFound(new ProblemDetails { Title = "Review not Found" });
            }
            return Ok(review);
        }

        [HttpPost]
        public async Task<ActionResult> PostReview([FromForm] CreateReviewDTO createReviewDTO)
        {


            try
            {
                var review = _mapper.Map<Review>(createReviewDTO);

                _context.Reviews.Add(review);


                var result = await _context.SaveChangesAsync() > 0;
                if (result) return CreatedAtRoute("GetReview", new { Id = review.Id }, review);

                return BadRequest(new ProblemDetails { Title = "Problem creating new review" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");

                return StatusCode(500);
            }



        }

    }
}

























