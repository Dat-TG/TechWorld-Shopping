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
#### General Users
-   [x] Register an accout
-   [x] Sign in
-   [x] Authenticate users
-   [x] View products by category
-   [x] Search for a product by keyword
-   [x] Filter products list 
-   [x] View product details
-   [x] Add products to the shopping cart
-   [x] View the shopping cart
-   [x] Cancel an order
-   [x] Return an the order
-   [x] Place/Purchase an order
-   [x] Update quantity of each product/Delete an product in the shopping cart
-   [x] Order history: view all, filter by status
-   [x] Notifications: notify about delivering, delivered orders  
-   [x] Update account information: Name, Phone number, Email, Avatar, Addresses
-   [x] Review delivered products
-   [x] Update an review
-   [x] View trending products
-   [x] View all categories
#### Administrators
-   [x] View dashboard: statistics about the whole system
-   [x] Manage products (view all products, add, delete, update, search, filter)
-   [x] Statistics about top 10 trending categories, top 10 trending products 
-   [x] Manage advertisements, promotions (view all, add, delete, update)
-   [x] Manage users (view all users, delete, update Role, search)
-   [x] Manage categories (view all categories, add, update, delete, search)
-   [x] Manage brands (view all brands, add, update, delete, search)
-   [x] Manage orders (view all orders, update status, delete, search, filter)
-   [x] Manage reviews (view all reviews, update, delete, search, filter)

### To-do

-   [ ] Compare products: Compare the features, prices, and specifications of different products.
-   [ ] Share products: Share product information with others through various communication channels.
-   [ ] Apply promo codes: Apply promotional codes or discount coupons during the checkout process.
-   [ ] View recommendations: Receive personalized product recommendations based on your browsing and purchase history.
-   [ ] Set preferences: Customize your preferences for notifications, language, currency, and other settings.
-   [ ] View and redeem loyalty points: Check your accumulated loyalty points and redeem them for rewards or discounts.
-   [ ] Participate in surveys or polls: Engage in surveys or polls to provide feedback or opinions on products or services.
-   [ ] Recycle bin: Restore deleted items, such as products, images, ...

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
