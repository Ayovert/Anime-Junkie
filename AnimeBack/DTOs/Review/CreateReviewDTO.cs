using System.ComponentModel.DataAnnotations;

namespace AnimeBack.DTOs.Review
{
    public class CreateReviewDTO
    {
        [Required]
        public string Name {get; set;}
        [Required]
        public string Email {get; set;}

        [Required]
        public string Title {get; set;}

        [Required]

        public string UserReview {get; set;}

        [Required]
         [Range(1, 5)]

        public int Rating {get; set;}

    }
}