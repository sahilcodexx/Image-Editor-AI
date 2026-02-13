# Repimly - AI-Powered Image Editor

A modern, AI-powered image editing platform built with Next.js, Convex, and Fabric.js. Repimly provides an intuitive interface for creating and editing images with advanced AI features, all while maintaining a clean and responsive design.

## 🚀 Features

### Core Features
- **AI-Powered Editing**: Advanced AI tools for image enhancement, background removal, and intelligent image extension
- **Real-time Collaboration**: Cloud-based project storage with automatic saving
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Dark Mode**: Built-in theme switching for comfortable viewing
- **Project Management**: Create, organize, and manage multiple image projects

### AI Tools
- **AI Retouch**: Enhance image quality with AI-powered improvements
- **AI Upscale**: Increase resolution up to 16MP
- **Background Removal**: Remove backgrounds with AI precision
- **AI Image Extender**: Extend image boundaries intelligently
- **Smart Filters**: Apply AI-powered filters and adjustments

### Manual Editing Tools
- **Resize**: Change canvas dimensions with aspect ratio locking
- **Crop**: Crop images with multiple aspect ratio presets
- **Adjust**: Fine-tune brightness, contrast, saturation, and vibrance
- **Text Tool**: Add and customize text with various fonts and styles
- **Background Controls**: Change or remove backgrounds with color or image options

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Authentication pages
│   │   ├── sign-in/           # Sign in page
│   │   └── sign-up/           # Sign up page
│   ├── (main)/                 # Main application routes
│   │   ├── dashboard/         # User dashboard
│   │   └── editor/            # Image editor
│   └── globals.css             # Global styles
├── components/                  # Reusable UI components
│   ├── common/                 # Common layout components
│   ├── ui/                     # Reusable UI elements
│   └── features-section.tsx    # Features section component
├── convex/                      # Database schema and functions
│   ├── auth.config.ts          # Authentication configuration
│   ├── project.ts              # Project database functions
│   ├── schema.ts               # Database schema definition
│   └── users.ts                # User database functions
├── hooks/                       # Custom React hooks
│   ├── use-convex-query.tsx   # Convex query hook
│   └── use-plan-access.ts     # Plan access control hook
├── lib/                         # Utility functions
│   ├── schema.ts               # Type definitions
│   └── utils.ts                # Helper functions
├── context/                     # React context providers
│   └── context.tsx             # Canvas context
├── public/                      # Static assets
└── utils/                       # Additional utilities
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.1.5**: React framework with App Router
- **React 19.2.3**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **React Colorful**: Color picker component

### Backend & Database
- **Convex**: Real-time database and backend
- **Clerk**: Authentication and user management
- **ImageKit**: Image storage and transformation

### Image Processing
- **Fabric.js**: Canvas manipulation and image editing
- **React Dropzone**: File upload functionality

### Development Tools
- **ESLint**: Code linting
- **TypeScript**: Type safety
- **PostCSS**: CSS processing

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm, yarn, pnpm, or bun package manager
- ImageKit account (for image storage)
- Clerk account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Image-Editor-AI-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
   NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   
   # Clerk configuration
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Convex configuration
   CONVEX_URL=your_convex_url
   CONVEX_DEPLOYMENT=your_convex_deployment
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### ImageKit Setup
1. Create an account at [ImageKit.io](https://imagekit.io/)
2. Create a new folder for your images
3. Copy the URL endpoint and public key
4. Add them to your `.env.local` file

### Clerk Setup
1. Create an account at [Clerk.dev](https://clerk.dev/)
2. Create a new application
3. Copy the publishable and secret keys
4. Add them to your `.env.local` file

### Unsplash Integration
1. Create an account at [Unsplash.com](https://unsplash.com/)
2. Create a new application
3. Copy the access key
4. Add it to your `.env.local` file

## 🎯 Usage Guide

### User Authentication
1. Click "Sign In" on the homepage
2. Choose your preferred authentication method (email, Google, etc.)
3. Complete the sign-in process
4. You'll be redirected to your dashboard

### Creating a New Project
1. Navigate to the dashboard
2. Click "Create Project"
3. Choose an image to upload or start with a blank canvas
4. Select your desired canvas dimensions
5. Click "Create" to start editing

### Using the Editor

#### Toolbar
- **Resize**: Change canvas dimensions
- **Crop**: Crop your image with aspect ratio presets
- **Adjust**: Fine-tune image properties
- **Background**: Remove or change background
- **AI Tools**: Access AI-powered features
- **Text**: Add and customize text

#### AI Tools
- **AI Retouch**: Enhance image quality
- **AI Upscale**: Increase resolution
- **Background Removal**: Remove backgrounds
- **AI Image Extender**: Extend image boundaries

#### Manual Adjustments
- **Brightness**: Adjust image brightness (-100 to 100)
- **Contrast**: Adjust image contrast (-100 to 100)
- **Saturation**: Adjust color saturation (-100 to 100)
- **Vibrance**: Adjust vibrance (-100 to 100)

### Saving and Exporting
1. Changes are automatically saved to the cloud
2. Use the save button to manually save
3. Export your final image in various formats

## 📊 Database Schema

The application uses Convex for real-time database management with the following schema:

### Users Table
- `name`: User's name (string)
- `email`: User's email (string)
- `tokenIdentifier`: Authentication token (string)
- `imageUrl`: Profile image URL (optional string)
- `plan`: Subscription plan ("free" | "pro")
- `projectUsed`: Number of projects used (number)
- `exportProjectThisMonth`: Monthly export count (number)
- `createdAt`: Account creation timestamp (number)
- `lastActive`: Last active timestamp (number)

### Projects Table
- `title`: Project title (string)
- `userId`: Reference to user ID (string)
- `canvasState`: Canvas state data (any)
- `width`: Canvas width (number)
- `height`: Canvas height (number)
- `originalImageUrl`: Original image URL (optional string)
- `currentImageUrl`: Current image URL (optional string)
- `thumbnailUrl`: Thumbnail image URL (optional string)
- `activeTransformation`: Active ImageKit transformation (optional string)
- `backgroundRemove`: Background removal status (optional boolean)
- `folderId`: Folder reference (optional string)
- `createdAt`: Project creation timestamp (number)
- `updatedAt`: Last update timestamp (number)

## 🔧 Development

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Code Organization

- **Components**: Reusable UI components in `components/`
- **Pages**: Next.js pages in `app/`
- **Hooks**: Custom React hooks in `hooks/`
- **Context**: React context providers in `context/`
- **Database**: Convex functions in `convex/`
- **Utilities**: Helper functions in `lib/` and `utils/`

### Adding New Features

1. Create components in the appropriate directory
2. Add database functions to `convex/` if needed
3. Update types in `utils/types.ts`
4. Add new routes in `app/` if needed
5. Test thoroughly before deployment

## 🐳 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Manual Deployment
1. Build the application: `npm run build`
2. Start the production server: `npm run start`
3. Configure your web server (nginx, apache, etc.)
4. Set up SSL certificates
5. Configure environment variables

## 🔒 Security

- **Authentication**: Clerk provides secure authentication
- **Data Protection**: Convex handles data encryption
- **Environment Variables**: Sensitive data stored securely
- **Input Validation**: Server-side validation for all inputs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- Use TypeScript for type safety
- Follow Prettier formatting
- Use ESLint for code quality
- Write descriptive commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Convex](https://convex.dev/) - Real-time database
- [Fabric.js](https://fabricjs.com/) - Canvas manipulation
- [ImageKit](https://imagekit.io/) - Image processing
- [Clerk](https://clerk.dev/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the codebase for implementation details

---

**Built with ❤️ using modern web technologies**
