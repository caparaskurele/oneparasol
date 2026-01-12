# Student Learning & Gamification System - Complete Documentation

## Overview

Your One Parasol website now has a complete student learning management and gamification system that enables:
- Student authentication (signup/signin)
- Unified learning hub for 5 topics (Python, SQL, Excel, Power BI, General Learning)
- Points system (10 points per learning shared)
- Medal rewards (Silver @ 100 pts, Gold @ 500 pts, Platinum @ 1000 pts)
- Personalized student profiles with learning history

---

## 🎯 Key Features

### 1. **Authentication System**

#### Sign Up (`/signup`)
- Students create account with name, email, password
- Password must be at least 6 characters
- Email validation to prevent duplicates

#### Sign In (`/signin`)
- Email + password authentication
- Session persists across page refreshes
- Redirects to My Profile after successful login

#### Session Management
- NextAuth.js handles all session logic
- JWT-based session storage
- User can sign out from any page via My Profile

---

### 2. **Unified Learning Hub** (`/share-learning`)

**Single page** where students can share learnings for 5 topics:
- 🐍 **Python**
- 🗄️ **SQL**
- 📊 **Excel**
- 📈 **Power BI**
- 📚 **General Learning**

#### How It Works:
1. Students click "Share Your Learning"
2. Select a topic from dropdown
3. Enter:
   - **Learning Title** - What they learned
   - **Learning Content** - Detailed notes/observations
   - **Code** (optional) - Code snippets with comments
   - **Files** (optional) - Images, videos, PDFs, documents
4. Click "Share Learning (Earn 10 Points!)"
5. Learning instantly appears at top of list
6. **Automatically awarded 10 points**

#### Student Permissions:
- ✅ Create learnings
- ✅ Edit own learnings
- ✅ Delete own learnings
- ✅ Add/remove files from own learnings
- ✅ View all students' learnings

#### Public Display:
- All learnings visible to all users (signed in or not)
- Sorted by newest first
- Filterable by topic
- Shows student name, date, title
- Expandable to view full content

---

### 3. **Points System** 💰

#### How Points Are Earned:
- **+10 points** for every learning shared
- **−10 points** if a learning is deleted (deducts from total)
- Points are tracked in database per student

#### Medal Achievements:

| Medal | Points Needed | Emoji |
|-------|---------------|-------|
| Silver Medal | 100 points | 🥈 |
| Gold Medal | 500 points | 🥇 |
| Platinum Medal | 1000 points | 🏆 |

#### Automatic Medal Assignment:
- Medals appear on **My Profile** page
- Progress bars show distance to next milestone
- All medals unlocked at 1000+ points

---

### 4. **My Profile Page** (`/my-profile`)

A personalized dashboard showing:

#### Top Stats (4-Column Grid)
1. **Total Points** - Running total earned
2. **Your Medal** - Current medal with emoji
3. **Learnings Shared** - Total count
4. **Next Milestone** - Points remaining for next medal

#### Medal Progress Section
- Visual progress bars for each medal tier
- Shows current vs. required points
- Color-coded (silver, gold, platinum)

#### Learning by Topic Section
- Count of learnings per topic (Python, SQL, Excel, Power BI, General)
- Visual grid display

#### Your Learnings Section
- List of all learnings student has created
- Filterable by topic
- Shows title, topic, and date
- Clickable to view full details on Share Learning page

#### Sign Out Button
- Located in top right
- Signs out student and redirects to home

---

## 📊 Database Schema

### Users Table
```
- id: String (unique)
- name: String
- email: String (unique)
- password: String (hashed with bcrypt)
- totalPoints: Int (default: 0)
- createdAt: DateTime
- updatedAt: DateTime
```

### Learnings Table
```
- id: String (unique)
- userId: String (foreign key)
- topic: String (Python, SQL, Excel, Power BI, General Learning)
- title: String
- content: String (markdown-compatible)
- code: String (optional)
- files: String (JSON array of filenames)
- createdAt: DateTime
- updatedAt: DateTime
```

### File Storage
Location: `./data/learnings/<timestamp>/`
- Each learning has its own directory
- Files stored with timestamp prefix
- Organized by learning ID for quick access

---

## 🔌 API Endpoints

### Authentication

**POST** `/api/auth/signup`
- Body: `{ name, email, password }`
- Returns: User object with ID
- Status: 201 Created

**POST** `/api/auth/[...nextauth]`
- NextAuth.js standard endpoints
- Handles signin/signout/session

**GET** `/api/auth/profile`
- Returns: Complete user profile with learnings and stats
- Requires: Authentication
- Status: 200 OK or 401 Unauthorized

### Learnings

**GET** `/api/learnings`
- Query params: `?topic=Python` (optional)
- Returns: Array of learnings (sorted by date desc)
- Public endpoint (no auth required)

**POST** `/api/learnings`
- Creates new learning
- Body: FormData with files
- Requires: Authentication
- Awards: 10 points automatically
- Status: 201 Created

**GET** `/api/learnings/[id]`
- Returns: Single learning object
- Public endpoint

**PUT** `/api/learnings/[id]`
- Updates learning (title, content, code, files)
- Requires: User must own learning
- Status: 200 OK

**DELETE** `/api/learnings/[id]`
- Deletes entire learning + files
- Requires: User must own learning
- Deducts: 10 points
- Status: 200 OK

**GET** `/api/learnings/[id]/[filename]`
- Downloads file from learning
- Public endpoint

**DELETE** `/api/learnings/[id]/[filename]`
- Deletes single file from learning
- Requires: User must own learning
- Status: 200 OK

---

## 🧭 Navigation Updates

The main navigation bar now includes:

- **Home**
- **About**
- **Python** (existing Python hub)
- **Share Learning** (new unified hub)
- **Knowledge Hub** (with dropdown)
- **Offerings**
- **[Removed: Blogs]** ← This page has been removed
- **My Profile** (appears when signed in)
- **Sign In / Sign Up** (appears when signed out)

The Navbar is context-aware:
- Shows auth links based on session state
- "My Profile" replaces Sign In/Sign Up when logged in

---

## 📁 New File Locations

### Pages
- `/src/app/signup/page.tsx` - Sign up page
- `/src/app/signin/page.tsx` - Sign in page
- `/src/app/my-profile/page.tsx` - Profile dashboard
- `/src/app/share-learning/page.tsx` - Unified learning hub

### Components
- `/src/components/LearningForm.tsx` - Form to create/edit learning
- `/src/components/LearningsDisplay.tsx` - Display all learnings with filters
- `/src/components/SignInMessage.tsx` - Sign in success message

### API Routes
- `/src/app/api/auth/[...nextauth]/route.ts` - NextAuth routes
- `/src/app/api/auth/signup/route.ts` - Signup API
- `/src/app/api/auth/profile/route.ts` - Profile API
- `/src/app/api/learnings/route.ts` - Learnings CRUD
- `/src/app/api/learnings/[id]/route.ts` - Single learning CRUD
- `/src/app/api/learnings/[id]/[filename]/route.ts` - File download/delete

### Configuration
- `/src/lib/auth.ts` - NextAuth configuration
- `/src/lib/prisma.ts` - Prisma client
- `/prisma/schema.prisma` - Database schema
- `/migrations/` - Database migrations

---

## 🔒 Security Features

✅ **Password Security**
- Passwords hashed with bcrypt (10 rounds)
- Never stored in plaintext
- Validated for minimum 6 characters

✅ **Session Security**
- JWT-based sessions
- Signed with NEXTAUTH_SECRET
- Httponly cookies (by default)
- CSRF protection built-in

✅ **Data Ownership**
- Users can only edit/delete their own learnings
- File access restricted to learning owner
- API validates ownership before modifications

✅ **Directory Traversal Protection**
- File paths validated to prevent escaping `/data/learnings/`
- Prevents access to system files

---

## 🚀 How to Test

### Test Sign Up
1. Go to `http://localhost:3001/signup`
2. Enter: Name, Email, Password (min 6 chars)
3. Click "Create Account"
4. You'll be redirected to sign in page

### Test Sign In
1. Go to `http://localhost:3001/signin`
2. Enter your email and password
3. Click "Sign In"
4. You'll be redirected to My Profile

### Test Share Learning
1. Go to `http://localhost:3001/share-learning`
2. Click "Share Your Learning"
3. Select Python topic
4. Enter title like "How to Open Files in Colab"
5. Add content, optional code, optional files
6. Click "Share Learning (Earn 10 Points!)"
7. Check that it appears at top and points increased

### Test My Profile
1. Go to `/my-profile`
2. Verify points increased by 10
3. Check "Learnings Shared" count
4. View "Your Learnings" list
5. Click filter buttons to filter by topic

### Test Editing
1. On Share Learning page, click pencil icon on your learning
2. Modify content/title
3. Click "Update Learning"
4. Verify changes saved

### Test Deleting
1. On Share Learning page, click trash icon on your learning
2. Confirm deletion
3. Verify points decreased by 10

---

## ⚙️ Configuration

### Change Secret Key (Production)
Edit `.env`:
```
NEXTAUTH_SECRET="your-very-long-random-secret-key-change-this"
NEXTAUTH_URL="https://yourdomain.com"
```

### Change Database
Edit `/prisma/schema.prisma` datasource provider:
```
datasource db {
  provider = "postgresql"  // or "mysql", "mongodb"
  url      = env("DATABASE_URL")
}
```

### Add More Topics
Edit `/src/components/LearningForm.tsx`:
```typescript
const topics = ['Python', 'SQL', 'Excel', 'Power BI', 'General Learning', 'Your New Topic'];
```

---

## 🐛 Troubleshooting

### Can't Sign Up
- Check email isn't already registered
- Password must be 6+ characters
- Ensure database is running (`prisma/dev.db`)

### Sign In Fails
- Verify email/password are correct
- Check NEXTAUTH_SECRET is set
- Clear browser cookies and try again

### My Points Didn't Increase
- Refresh the page
- Check that learning was created successfully
- Verify API response was 201 Created

### Can't See My Profile
- Must be signed in
- Check browser allows session cookies
- Try signing out and back in

### Files Not Uploading
- Check file size isn't too large (recommended <50MB)
- Ensure `/data/learnings/` directory exists
- Check write permissions on `/data/` folder

---

## 📈 Future Enhancements

1. **Leaderboard** - Show top students by points
2. **Badges** - Multiple achievement badges beyond medals
3. **Comments** - Students comment on each other's learnings
4. **Search** - Find learnings by keyword
5. **Categories** - Create custom learning categories
6. **Email Notifications** - Alert on new learnings
7. **Rich Text Editor** - Better content formatting
8. **Syntax Highlighting** - Better code display
9. **Export** - Download learning as PDF/Markdown
10. **Analytics** - Track student engagement metrics

---

## 📞 Support

All student data is stored locally on your server:
- Database: `./prisma/dev.db` (SQLite)
- Files: `./data/learnings/`

To backup student data:
```bash
# Backup database
cp prisma/dev.db prisma/dev.db.backup

# Backup files
xcopy /E /I data\learnings data\learnings.backup
```

---

**🎉 You now have a complete student learning and gamification platform!**

Your students can:
✅ Sign up and create accounts
✅ Share learnings across 5 topics
✅ Earn 10 points per learning
✅ Work toward medals (Silver, Gold, Platinum)
✅ View their learning history and progress
✅ Learn from each other's contributions

The system is fully functional and ready for your students to start using! 🚀
