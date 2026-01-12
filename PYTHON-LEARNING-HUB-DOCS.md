# Python Learning Hub - Feature Documentation

## Overview
The Python Learning Hub is an interactive student learning notes platform integrated into your One Parasol website. It allows students to share their practical Python learning experiences, code snippets, tips, and multimedia content in a collaborative, timestamped environment.

## Features

### ✨ Student Capabilities
- **Text-based Learning Notes**: Write detailed observations and insights about what they learned
- **Python Code Snippets**: Share executable Python code with inline comments
- **File Uploads**: Upload images, screenshots, videos, PDFs, and documents
- **Edit & Update**: Modify their own submissions anytime to improve or expand content
- **Rich Content**: Combine text, code, and multimedia in a single note
- **View Others**: Browse and learn from classmates' contributions

### 👨‍🏫 Instructor (Admin) Capabilities
- **View All Submissions**: Access the complete repository of student learning
- **Delete Content**: Remove inappropriate or outdated submissions
- **File Management**: Delete specific files from submissions
- **Moderation**: Keep the platform clean and focused

### 🔄 System Features
- **Automatic Timestamps**: Every submission and update is timestamped
- **Latest First**: Newest submissions appear at the top for discoverability
- **Edit Tracking**: Shows both creation and last update times
- **Persistent Storage**: All data is saved on your website (file-based system)
- **File Organization**: Submissions and their files are organized by submission ID

## How It Works

### User Journey

1. **Access the Python Page**
   - Navigate to `/python` on your website
   - The Python Learning Hub is prominently featured

2. **Share Learning**
   - Click "Add Your Learning Notes"
   - Fill in:
     - Your Name (required)
     - What You Learned (required text)
     - Python Code (optional)
     - File attachments (optional)
   - Click "Share Learning"

3. **Update Existing Notes**
   - Click the ✏️ edit icon on your submission
   - Modify content, code, or files
   - Click "Update Notes"
   - The "Updated at" timestamp is automatically refreshed

4. **View All Submissions**
   - Scroll through the list (newest first)
   - Click any submission to expand and see:
     - Full text content
     - Python code with syntax highlighting
     - Attached files with download links
   - Collapse to see preview again

5. **Download Files**
   - Click on any attached file to download
   - Files are organized with emojis:
     - 🖼️ Images
     - 🎬 Videos
     - 📄 PDFs
     - 📝 Documents
     - 📎 Other files

## Architecture

### Frontend Components

#### `StudentNoteForm.tsx`
- Form for creating and editing submissions
- Handles file selection and preview
- Validation for required fields
- Loading states and error handling
- Shows existing files when editing
- Responsive design for mobile and desktop

#### `PythonNotesDisplay.tsx`
- Main display component for all submissions
- Fetches notes from API (GET request)
- Handles note expansion/collapse
- Admin delete functionality (when enabled)
- File download links with icons
- Automatic date/time formatting
- Edit capability

#### `python/page.tsx`
- Main Python page at route `/python`
- Includes hero section
- "How It Works" information box
- Integrates StudentNoteForm and PythonNotesDisplay

### Backend API Routes

#### `GET /api/python-notes`
- Returns all submissions (sorted by date, newest first)
- Response: Array of note objects
- No authentication required (public read)

#### `POST /api/python-notes`
- Create a new submission
- Accepts FormData with:
  - `studentName` (string)
  - `content` (string)
  - `pythonCode` (string, optional)
  - `files` (File[], optional)
- Returns created note with ID
- Status: 201 Created

#### `GET /api/python-notes/[id]`
- Retrieve specific submission
- Returns single note object

#### `PUT /api/python-notes/[id]`
- Update a submission
- Accepts same FormData as POST
- Can add new files to existing submission
- Updates the "updatedAt" timestamp
- Status: 200 OK

#### `DELETE /api/python-notes/[id]`
- Delete entire submission and its files
- Admin only (in production, add auth check)
- Status: 200 OK

#### `GET /api/python-notes/[id]/[filename]`
- Download a file from a submission
- Returns file with proper headers
- Security: Prevents directory traversal

#### `DELETE /api/python-notes/[id]/[filename]`
- Delete specific file from submission
- Admin only (in production, add auth check)
- Updates file list and metadata

### Data Storage

**Location**: `./data/python-notes/`

**Directory Structure**:
```
data/python-notes/
├── <timestamp-1>/
│   ├── meta.json              (Submission metadata)
│   ├── <filename-1>            (Uploaded files)
│   └── <filename-2>
├── <timestamp-2>/
│   └── ...
└── <timestamp-1>.json         (Index for quick listing)
```

**Note Object Structure**:
```json
{
  "id": "1735347600123",
  "studentName": "John Doe",
  "content": "Today I learned how to open a file in Google Colab...",
  "pythonCode": "import pandas as pd\ndf = pd.read_csv('data.csv')",
  "files": ["1735347620000-screenshot.png", "1735347625000-code.py"],
  "createdAt": "2024-12-27T10:00:00.000Z",
  "updatedAt": "2024-12-27T10:30:00.000Z"
}
```

## Navigation Integration

The Python page is integrated into the main navigation:
- Added to the desktop navigation menu in [Navbar.tsx](src/components/Navbar.tsx)
- Link: `/python`
- Mobile menu ready for future expansion

## Enabling Admin Features

Currently, the admin delete functionality is disabled. To enable it:

1. **Implement Authentication**:
   - Set up NextAuth or another auth solution
   - Add session management

2. **Update `PythonNotesDisplay.tsx`**:
   ```typescript
   // Replace this line:
   const [isAdmin] = useState(false);
   
   // With your auth check:
   const session = useSession();
   const isAdmin = session?.user?.role === 'admin';
   ```

3. **Add Auth Check to API Routes**:
   ```typescript
   // In DELETE endpoints:
   const session = await getServerSession(authOptions);
   if (!session || session.user.role !== 'admin') {
     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }
   ```

## Customization

### Change Colors/Styling
All components use TailwindCSS with indigo as the primary color. Edit:
- `bg-indigo-600` → Your color
- `text-indigo-600` → Your color
- `hover:text-indigo-700` → Your hover color

### Allowed File Types
Edit the `accept` attribute in [StudentNoteForm.tsx](src/components/StudentNoteForm.tsx#L90):
```tsx
accept="image/*,video/*,.pdf,.doc,.docx,.py"  // Add .py for Python files
```

### Max File Size
Add validation in `StudentNoteForm.tsx`:
```typescript
const maxSizeMB = 50;
if (file.size > maxSizeMB * 1024 * 1024) {
  alert(`File too large`);
  return;
}
```

### Date/Time Format
Edit the `formatDate` function in [PythonNotesDisplay.tsx](src/components/PythonNotesDisplay.tsx#L76):
```typescript
const timeString = date.toLocaleTimeString('en-US', { /* options */ });
```

## Testing

1. **Create a Test Submission**:
   ```
   - Navigate to /python
   - Click "Add Your Learning Notes"
   - Fill in all fields
   - Upload a test image
   - Click "Share Learning"
   ```

2. **Verify Features**:
   - Check that submission appears at the top
   - Click to expand and see all content
   - Click the ✏️ icon to edit
   - Verify timestamps are correct
   - Try downloading the file

3. **Test File Upload**:
   - Upload various file types (image, PDF, video)
   - Verify file appears in the list
   - Download the file
   - File should be intact

## Troubleshooting

### Files Not Saving
- Check that `./data/python-notes/` directory exists (created automatically)
- Verify write permissions on the data directory
- Check browser console for error messages

### Form Not Submitting
- Verify FormData is being sent correctly
- Check Network tab in DevTools
- Ensure API routes are compiled (npm run build)

### Files Not Displaying
- Verify file paths in the database metadata
- Check that files exist in the file system
- Clear browser cache and reload

### Admin Features Not Working
- Ensure authentication is properly implemented
- Verify session/token is being sent with requests
- Add authorization headers if using JWT

## Future Enhancements

1. **Rich Text Editor**: Add WYSIWYG editor instead of plain textarea
2. **Syntax Highlighting**: Better Python code display with line numbers
3. **Comments**: Allow students to comment on each other's notes
4. **Search & Filter**: Find notes by student name, date, or keyword
5. **Categories/Tags**: Organize by topic (Pandas, NumPy, etc.)
6. **Live Preview**: Real-time rendering of uploaded images
7. **Collaborative Editing**: Multiple students on one note
8. **Export**: Download submissions as PDF or markdown
9. **Analytics**: Track student engagement and learning patterns
10. **Email Notifications**: Alert instructors of new submissions

## File Locations

- **Main Page**: [src/app/python/page.tsx](src/app/python/page.tsx)
- **Display Component**: [src/components/PythonNotesDisplay.tsx](src/components/PythonNotesDisplay.tsx)
- **Form Component**: [src/components/StudentNoteForm.tsx](src/components/StudentNoteForm.tsx)
- **API Routes**: [src/app/api/python-notes/](src/app/api/python-notes/)
- **Navigation**: [src/components/Navbar.tsx](src/components/Navbar.tsx)

## Support & Questions

This feature is designed to be self-contained and requires minimal configuration. All data is stored locally on your server, ensuring full control and privacy of student submissions.

For advanced customization or integration with databases (MongoDB, PostgreSQL, etc.), modify the API routes to use your preferred data storage solution instead of the file system.
