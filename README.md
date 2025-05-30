# Blog Editor Application

A full-stack blog editor application built with React, Node.js, and MongoDB.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Database Configuration](#database-configuration)
- [API Documentation](#api-documentation)
- [Frontend Components](#frontend-components)
- [Development](#development)
- [Deployment](#deployment)

## Features

- Create, read, update, and delete blog posts
- Draft and publish functionality
- Tag management for blog posts
- Real-time autosave
- Responsive design
- Modern UI with TailwindCSS
- MongoDB Atlas integration

## Tech Stack

### Frontend
- React 18.3.1
- React Router DOM 6.20.0
- TailwindCSS 3.4.1
- Lucide React (for icons)
- React Hot Toast (for notifications)
- Vite (build tool)

### Backend
- Node.js
- Express.js 4.18.2
- MongoDB/Mongoose
- CORS enabled
- Body Parser

### Database
- MongoDB Atlas
- Mongoose ODM

## Project Structure

```
project/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   │   ├── BlogCard.tsx   # Individual blog preview
│   │   ├── BlogEditor.tsx # Blog creation/editing
│   │   ├── BlogList.tsx   # List of blogs
│   │   └── Navbar.tsx     # Navigation component
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API services
│   ├── types/             # TypeScript types
│   ├── App.tsx            # Main React component
│   └── main.tsx           # Application entry point
├── server/                 # Backend source code
│   ├── config/            # Server configuration
│   │   └── db.js         # MongoDB configuration
│   ├── models/            # Database models
│   │   └── Blog.js       # Blog schema
│   └── index.js          # Server entry point
└── configuration files    # Various config files
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd blog-editor
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a .env file in the root directory:
\`\`\`env
MONGODB_URI=your_mongodb_connection_string
PORT=3001
\`\`\`

4. Start the development servers:
\`\`\`bash
npm run dev:full
\`\`\`

## Database Configuration

### MongoDB Atlas Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Add connection string to .env file

### Database Schema

Blog Schema:
\`\`\`javascript
{
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  timestamps: true
}
\`\`\`

## API Documentation

### Endpoints

#### Get All Blogs
- **GET** `/api/blogs`
- Returns all blogs sorted by creation date

#### Get Single Blog
- **GET** `/api/blogs/:id`
- Returns a specific blog by ID

#### Save Draft
- **POST** `/api/blogs/save-draft`
- Body:
  ```json
  {
    "title": "string",
    "content": "string",
    "tags": "comma,separated,tags"
  }
  ```

#### Publish Blog
- **POST** `/api/blogs/publish`
- Body: Same as save draft

#### Delete Blog
- **DELETE** `/api/blogs/:id`
- Removes a blog post

## Frontend Components

### BlogEditor Component
- Rich text editing
- Autosave functionality
- Draft/Publish options
- Tag management

### BlogList Component
- List view of all blogs
- Filtering by status
- Blog preview cards
- Responsive grid layout

### BlogCard Component
- Blog preview display
- Edit/Delete actions
- Status indicator
- Creation/Update timestamps

## Development

### Running in Development Mode
\`\`\`bash
# Run frontend and backend together
npm run dev:full

# Run frontend only
npm run dev

# Run backend only
npm run server
\`\`\`

### Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Backend server port (default: 3001)

## Deployment

### Frontend Deployment
1. Build the frontend:
\`\`\`bash
npm run build
\`\`\`
2. Deploy the `dist` directory to your hosting service

### Backend Deployment
1. Ensure environment variables are set
2. Deploy the server directory to your hosting service
3. Update CORS settings if necessary

## Error Handling

The application includes comprehensive error handling:
- Database connection errors
- API request errors
- Form validation
- Network issues
- Graceful degradation

## Security Features

- MongoDB connection string in environment variables
- CORS enabled
- Input sanitization
- Error message sanitization
- Secure database operations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 