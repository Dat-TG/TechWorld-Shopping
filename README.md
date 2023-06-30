# Tech World

An open source project in the Software Design course [20_3 (2022-2023)](https://courses.fit.hcmus.edu.vn/course/view.php?id=3622) at [HCMUS](https://www.hcmus.edu.vn/).

Our Next.js-based e-commerce project is a cutting-edge online platform that offers a wide range of high-quality tech devices for tech enthusiasts and gadget lovers. With a sleek and modern user interface, the website provides a seamless shopping experience to customers, allowing them to explore and purchase the latest smartphones, tablets, laptops, gaming consoles, smart home devices, and more.

## Collaborators

-   [20120454] Lê Công Đắt [@Dat-TG](https://github.com/Dat-TG)
-   [20120470] Nguyễn Văn Hào [@haonguyen22](https://github.com/haonguyen22)
-   [20120489] Võ Phi Hùng [@phihungtf](https://github.com/phihungtf)

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (latest version)
-   [MongoDB](https://www.mongodb.com/)
-   [Cloudinary](https://cloudinary.com/)

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, copy [.env.example](.env.example) to `.env` and fill in the environment variables:

```bash
NODE_ENV="development"

DATABASE_URL=""

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""

CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
CLOUDINARY_UPLOAD_PRESET=""
```

Next, sync the database schema by running the following command:

```bash
npx prisma db push
# or
yarn prisma db push
# or
pnpx prisma db push
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployed version

Check out our deployed version at [https://tech-world-hcmus.vercel.app/](https://tech-world-hcmus.vercel.app/)

## Features

### Done

-   [x] View products by category
-   [x] Search for a product
-   [x] View product details
-   [x] Add a product to the shopping cart
-   [x] View the shopping cart
-   [x] Cancel an order
-   [x] Place an order
-   [x] Update the shopping cart
-   [x] Review a product
-   [x] Return a product
-   [x] Update account information
-   [x] Authenticate users
-   [x] Manage cover images
-   [x] Manage users
-   [x] Manage categories
-   [x] Manage orders
-   [x] View dashboard
-   [x] Manage products
-   [x] Manage reviews

### To-do

-   [] Compare products: Compare the features, prices, and specifications of different products.
-   [] Share products: Share product information with others through various communication channels.
-   [] Apply promo codes: Apply promotional codes or discount coupons during the checkout process.
-   [] View recommendations: Receive personalized product recommendations based on your browsing and purchase history.
-   [] Set preferences: Customize your preferences for notifications, language, currency, and other settings.
-   [] View and redeem loyalty points: Check your accumulated loyalty points and redeem them for rewards or discounts.
-   [] Participate in surveys or polls: Engage in surveys or polls to provide feedback or opinions on products or services.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
