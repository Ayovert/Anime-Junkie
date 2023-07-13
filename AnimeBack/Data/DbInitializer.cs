using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AnimeBack.Entities;
using AnimeBack.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace AnimeBack.Data
{
    public static class DbInitializer
    {
        public static async Task InitializeProduct(DataContext context, UserManager<User> userManager, IConfiguration configuration)
        {
       var result =     context.Database.EnsureCreated();

       
            if (!userManager.Users.Any())
            {

                var roles = new List<Role>{
                new Role { Id = 1, Name = "Member", NormalizedName = "MEMBER" },
                new Role { Id = 2, Name = "Admin", NormalizedName = "ADMIN" }
            };

             foreach (var role in roles){
                context.Roles.Add(role);
            }


                var user = new User
                {
                    UserName = "Ayo",
                    Email = configuration["Email1"]
                };
                await userManager.CreateAsync(user, configuration["PasswordX"]);
                await userManager.AddToRoleAsync(user, "Member");


                var admin = new User
                {
                    UserName = "admin",
                    Email = configuration["Email2"]
                };
                await userManager.CreateAsync(admin, configuration["PasswordX"]);
                await userManager.AddToRolesAsync(admin, new[] { "Member", "Admin" });



            }



            if (context.Products.Any()) return;

            
            var products = new List<Product>
            {
                new Product
                {
                    Price = 100,
                    Name = "Boku no Hero bag",
                    Description= "Kisame bag",
                    PictureUrl= "/images/products/bag1.png",
                    CategoryId= 4,
                    ProductImages = new List<ProductImage>{
                        new ProductImage{
                            PictureUrl= "/images/products/bag1.png",
                            PublicId = "BokunoHeroBag"
                        }
                    }

                },
                new Product
                {
                    Name = "Naruto T-Shirt",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 20000,
                    PictureUrl = "/images/products/narutoShirt.png",
                    CategoryId = 1,
                    ProductImages = new List<ProductImage>{
                        new ProductImage{
                            PictureUrl= "/images/products/narutoShirt.png",
                            PublicId = "narutoShirt1"
                        },
                        new ProductImage{
                            PictureUrl= "/images/products/narutoShirt2.png",
                            PublicId = "narutoShirt2"
                        }
                    }
                },
                new Product
                {
                    Name = "Akatsuki Shirt",
                    Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                    Price = 20000,
                    PictureUrl = "/images/products/akatsukiShirt.png",
                    CategoryId = 1,
                    ProductImages = new List<ProductImage>{
                        new ProductImage{
                            PictureUrl= "/images/products/akatsukiShirt.png",
                            PublicId = "AkatsukiShirt"
                        }
                    }
                },
                new Product
                {
                    Name = "Ankle Socks",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 20000,
                    PictureUrl = "/images/products/ankleSocks.png",
                    CategoryId = 2,
                    ProductImages = new List<ProductImage>{
                        new ProductImage{
                            PictureUrl= "/images/products/ankleSocks.png",
                            PublicId = "ankleSocks"
                        }
                    }
                    
                },
                new Product
                {
                    Name = "Itachi Night Light",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 30000,
                    PictureUrl = "/images/products/itachiNight.jpeg",
                    CategoryId = 4,
                    ProductImages = new List<ProductImage>{
                        new ProductImage{
                            PictureUrl= "/images/products/itachiNight.jpeg",
                            PublicId = "itachiNight"
                        }
                    }
                },
                new Product
                {
                    Name = "Luffy Cap",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 25000,
                    PictureUrl = "/images/products/cap1.png",
                    CategoryId = 2,
                   ProductImages = new List<ProductImage>{
                        new ProductImage{
                            PictureUrl= "/images/products/cap1.png",
                            PublicId = "luffyCap1"
                        }
                    }
                   
                },
                new Product
                {
                    Name = "Fish Accessory",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1000,
                    PictureUrl = "/images/products/fish1.png",
                    CategoryId = 2,
                    ProductImages = new List<ProductImage>{
                        new ProductImage{
                            PictureUrl= "/images/products/fish1.png",
                            PublicId = "fish1"
                        }
                    }
                },
                 new Product
                {
                    Name = "Night light",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 8000,
                    PictureUrl = "/images/products/globe1.png",
                    CategoryId = 2,
                    ProductImages = new List<ProductImage>{
                        new ProductImage{
                            PictureUrl= "/images/products/globe1.png",
                            PublicId = "globe1"
                        }
                    }
                },
                new Product
                {
                    Name = "Demon Slayer Necklace",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureUrl = "/images/products/necklace.png",
                    CategoryId = 2,
                    ProductImages = new List<ProductImage>{
                        new ProductImage{
                            PictureUrl= "/images/products/necklace.png",
                            PublicId = "necklace1"
                        }
                    }
                },
                new Product
                {
                    Name = "One Piece Ring ",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1800,
                    PictureUrl = "/images/products/ring1.png",
                    CategoryId = 2,
                    ProductImages = new List<ProductImage>{
                        new ProductImage{
                            PictureUrl= "/images/products/ring1.png",
                            PublicId = "ring1"
                        }
                    }
                },
                new Product
                {
                    Name = "Tanjiro X Nezuko Wallpaper",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureUrl = "/images/products/tanjiro1.png",
                    CategoryId = 2,
                    ProductImages = new List<ProductImage>{
                        new ProductImage{
                            PictureUrl= "/images/products/tanjiro1.png",
                            PublicId = "tanjiro1"
                        }
                    }
                },
                new Product
                {
                    Name = "Ichigo Hollow T-Shirt",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1600,
                    PictureUrl = "/images/products/ichigo-hollow.png",
                    CategoryId = 1,
                    ProductImages = new List<ProductImage>{
                        new ProductImage{
                            PictureUrl= "/images/products/ichigo-hollow.png",
                            PublicId = "ichigoHollow1"
                        }
                    }
                },
                new Product
                {
                    Name = "Bleach White T-Shirt",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1400,
                    PictureUrl = "/images/products/bleach_white.png",
                    CategoryId = 1,
                    ProductImages = new List<ProductImage>{
                        new ProductImage{
                            PictureUrl= "/images/products/bleach_white.png",
                            PublicId = "bleachWhite"
                        }
                    }
                },
                new Product
                {
                    Name = "Akatsuki Hoodie",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 25000,
                    PictureUrl = "/images/products/akatsukiHoodie.png",
                    CategoryId = 1,
                    ProductImages = new List<ProductImage>{
                        new ProductImage{
                            PictureUrl= "/images/products/akatsukiHoodie.png",
                            PublicId = "akatsukiHoodie1"
                        },
                        new ProductImage{
                            PictureUrl= "/images/products/akatsukiHoodieB.png",
                            PublicId = "akatsukiHoodie2"
                        },
                    }
                },
                new Product
                {
                    Name = "Girl T-Shirt",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 18999,
                    PictureUrl = "/images/products/girl_tee.png",
                    CategoryId = 1,
                    ProductImages = new List<ProductImage>{
                        new ProductImage{
                            PictureUrl= "/images/products/girl_tee.png",
                            PublicId = "girlTee"
                        }
                    }
                }
            };


           


            foreach (var product in products)
            {
                product.CreatedAt = DateTime.Now;
                    product.ModifiedAt = DateTime.Now;
                product.QuantityInStock = 50;
                context.Products.Add(product);
            }




            context.SaveChanges();
        }


    }
}