import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  // Seed creatures


  // const creatures = [];
  // for (let i = 0; i < 5; i++) {
  //   creatures.push(
  //     await prisma.creature.create({
  //       data: {
  //         breed: `Breed${i + 1}`,
  //         temperment: "Friendly",
  //         lab: `Lab${i + 1}`,
  //         food: `Food${i + 1}`,
  //         price: 1.23,
  //         // imageUrl: `image${i + 1}.jpg`,
  //         imageUrl: "/images/Elephox.jpg",
  //         inStock: true,
  //         recommended: i % 2 === 0, // will alternate between true and false
  //       },
  //     })
  //   );
  // }


  const creatures = []; {
    creatures.push(
      await prisma.creature.createMany({
        data: [
          {
            breed: `Elephox`,
            temperment: "Friendly",
            lab: `Blue Moon Labs`,
            food: `squirrels and bananas`,
            price: 1.23,
            imageUrl: "/images/Elephox.jpg",
            inStock: true,
            recommended: true,
          },
          {
            breed: `Dolphant`,
            temperment: "Friendly",
            lab: `Blue Moon Labs`,
            food: `bananas and shrimp`,
            price: 1.23,
            imageUrl: "/images/dolphant.jpg",
            inStock: true,
            recommended: false,
          },
          {
            breed: `Foxfish`,
            temperment: "Deadly",
            lab: `Blue Moon Labs`,
            food: `squirrels and worms`,
            price: 1.23,
            imageUrl: "/images/foxfish.jpg",
            inStock: false,
            recommended: true,
          },
          {
            breed: `Hippobat`,
            temperment: "Clumsy",
            lab: `Blue Moon Labs`,
            food: `watermelons and mosquitoes`,
            price: 1.23,
            imageUrl: "/images/hippobat.jpg",
            inStock: true,
            recommended: true,
          },
          {
            breed: `Sharkbeaver`,
            temperment: "Leathal",
            lab: `Blue Moon Labs`,
            food: `Pine trees and swimmers`,
            price: 1.23,
            imageUrl: "/images/shark-beaver.jpg",
            inStock: true,
            recommended: false,
          },
          {
            breed: `Tigerturtle`,
            temperment: "Faster than you think",
            lab: `Blue Moon Labs`,
            food: `Lettuce and raw meat`,
            price: 1.23,
            imageUrl: "/images/tigerturtle.jpg",
            inStock: true,
            recommended: true,
          },
          {
            breed: `Walrant`,
            temperment: "Fast Breeder",
            lab: `Blue Moon Labs`,
            food: `Picnic baskets and fish`,
            price: 1.23,
            imageUrl: "/images/walrant.jpg",
            inStock: true,
            recommended: false,
          },
        ]
      })
    );
  }

  // Seed users
  for (let username of ["user1", "user2", "user3"]) {
    const user = await prisma.user.create({
      data: {
        username,
        password: `${username}pass`, // need to update this to be hashed
        email: `${username}@gmail.com`,
      },
    });

    // Seed shopping carts
    const shoppingCart = await prisma.shoppingCart.create({
      data: {
        userId: user.id,
      },
    });
    for (let i = 0; i < creatures.length; i++) {
      if (Math.random() < 0.5) continue; // 50% chance of adding a creature to the shopping cart
      // await prisma.cartCreature.create({
      //   data: {
      //     creature: creatures[i],
      //     shoppingCart: shoppingCart,
      //   },
      // });
    }
  }

  console.log("Seed data added successfully.");
  await prisma.$disconnect();
}

// Call the seed function to execute the seeding process
seed();
