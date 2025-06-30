# Flipr Full Stack Task – Landing Page + Admin Panel

## Features

### Landing Page
- Newsletter subscription bar at the top
- Our Projects section with dynamic data from the backend
- Happy Clients section with dynamic data from the backend
- Contact Form for user input
- Newsletter Subscription field
- Fully responsive using Tailwind CSS and shadcn/ui components

### Admin Panel (accessible at /admin)
- Add Project with name, description, and image (cropped before upload)
- Add Client with name, designation, description, and image (cropped before upload)
- View Contact Form submissions
- View Newsletter Subscriber emails

### Bonus Feature
- Integrated image cropper using react-easy-crop to crop images  before uploading via EdgeStore

---

## Technologies Used

- Next.js 15 (App Router)
- TypeScript
- MongoDB Atlas with Mongoose
- Tailwind CSS
- shadcn/ui component library
- EdgeStore for image uploads
- React Easy Crop for image cropping
- Axios for API communication
- React Hot Toast for notifications
- Vercel for deployment

---

## How to Run the Project Locally

1. Clone the repository:
   git clone https://github.com/your-username/flipr-assignment.git

2. Install dependencies:
   npm install

3. Create a `.env.local` file in the root folder and add your MongoDB URI:
   MONGODB_URI=your_mongodb_connection_string
   EDGE_STORE_ACCESS_KEY=your_edgestore_access_key
   EDGE_STORE_SECRET_KEY=your_edgestore_secret_key

4. Run the development server:
   npm run dev

5. Visit the app:
   - Landing Page: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

---



