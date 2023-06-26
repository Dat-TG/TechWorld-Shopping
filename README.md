# Tech World

An open source project in the Software Design course [20_3 (2022-2023)](https://courses.fit.hcmus.edu.vn/course/view.php?id=3622) at [HCMUS](https://www.hcmus.edu.vn/).

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
