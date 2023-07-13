using System;
using System.ComponentModel.DataAnnotations;

namespace AnimeBack.Entities
{
    public class Review
    {
        [Key]
        public int Id {get; set;}

        public int UserId {get; set;}

        public string Name {get; set;}
        public string Email {get; set;}

        public string Title {get; set;}

        public string UserReview {get; set;}
        public int Rating {get; set;}

        public DateTime DateCreated {get; set;} = DateTime.Now;

         public DateTime DateModified {get; set;} = DateTime.Now;

     
    }

}

// id
// user Id ? Anonymous
// Review
// Rating
// Date Created
// Date Modified