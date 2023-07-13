import * as yup from 'yup';

export const reviewValidationSchema = yup.object({
    rating: yup.number().required("Please enter a star rating for this review").moreThan(1,"Please enter a star rating for this review less"),
    name: yup.string().required(),
    email: yup.string().required(),
    title: yup.string().required(),
    userReview: yup.string().required(),
});



export const preOrderValidationSchema = yup.object({
    merchType: yup.string().required(),
    merchText: yup.string().required(),
    materialType: yup.string().required(),
    materialColor: yup.string().required(),
    animeTheme: yup.string().required(),
    description:yup.string().required(),
    conceptSketch: yup.mixed().when('pictureUrl', {
        is: (value: string) => !value,
        then: yup.mixed().required('Please provide an image')
    })
    
});


/*[Required]
        public string Name {get; set;}
        [Required]
        public string Email {get; set;}

        [Required]
        public string Title {get; set;}

        [Required]

        public string UserReview {get; set;}

        [Required]
         [Range(1, 5)]

        public int Rating {get; set;}*/