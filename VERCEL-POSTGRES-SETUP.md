# OneParasol: Production Database Setup for Vercel

## 🚨 Critical Issue Fixed

**Problem**: SQLite database doesn't work on Vercel (Error Code 14: Unable to open database file)
- **Root Cause**: SQLite files stored on Vercel's ephemeral filesystem (deleted between deployments)
- **Solution**: Migrated to PostgreSQL (persistent cloud database)

## ✅ New Features Added

1. **Email OTP Verification on Signup**
   - Users receive 6-digit OTP after registration
   - OTP expires in 10 minutes
   - Must verify email before accessing full features

2. **Password Reset with OTP**
   - Forgot password link on signin page
   - Email verification via OTP
   - Secure password reset flow

## 🔧 Setup Steps for Vercel Production

### Step 1: Create PostgreSQL Database

**Option A: Vercel Postgres (Recommended - Free tier available)**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your OneParasol project
3. Go to **Storage** tab
4. Click **Create Database** → Select **Postgres**
5. Copy the connection string (starts with `postgresql://`)

**Option B: Supabase (Free tier - 500MB)**

1. Go to [Supabase](https://supabase.com)
2. Create new project
3. Go to **Settings** → **Database** → **Connection pooling**
4. Copy the PostgreSQL connection string
5. Replace `[YOUR-PASSWORD]` with your actual database password

**Option C: Railway/Render (Free tier)**

- Railway: Similar setup, copy PostgreSQL connection URL
- Render: Create new PostgreSQL instance, copy connection string

### Step 2: Add Environment Variable to Vercel

1. In Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add new variable:
   ```
   Name: DATABASE_URL
   Value: postgresql://user:password@host:5432/dbname
   ```
3. Make sure it's added to:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

4. **Redeploy** to apply changes

### Step 3: Migrate Database Schema

After deployment to Vercel:

```bash
# Run this command from your local machine
npx prisma migrate deploy

# Or if needed, push schema changes:
npx prisma db push --force-reset
```

### Step 4: Test Email Configuration

The app uses Gmail SMTP. Verify your .env variables:

```
EMAIL_USER="oneparasol@gmail.com"
EMAIL_PASS="zyyi zwvd fkly amun"  # Gmail app-specific password
```

These are already configured, but if you want to use a different email:

1. Go to [Gmail App Passwords](https://myaccount.google.com/apppasswords)
2. Generate a new app password for "Mail" and "Windows Computer"
3. Update `EMAIL_PASS` in environment variables

### Step 5: Verify Everything Works

1. **Test Signup**:
   - Visit https://your-app.vercel.app/signup
   - Fill form and submit
   - Check email for OTP
   - Enter OTP to verify

2. **Test Signin**:
   - Use credentials from signup
   - Should sign in successfully

3. **Test Password Reset**:
   - Click "Forgot password?" on signin page
   - Enter email
   - Verify OTP from email
   - Set new password
   - Sign in with new password

## 📊 Database Models

### Users Table
```typescript
id: String (unique ID)
name: String
email: String (unique)
password: String (hashed)
emailVerified: Boolean (default: false)
totalPoints: Int (default: 0)
createdAt: DateTime
updatedAt: DateTime
```

### OTP Tokens Table
```typescript
id: String (unique ID)
userId: String (FK)
email: String
code: String (6 digits)
expiresAt: DateTime (10 minutes)
verified: Boolean (default: false)
createdAt: DateTime
```

### Password Reset Tokens Table
```typescript
id: String (unique ID)
userId: String (FK)
code: String (unique reset token)
expiresAt: DateTime
used: Boolean (default: false)
createdAt: DateTime
```

## 🔐 Security Features Implemented

✅ Password hashing with bcryptjs (12 salt rounds)
✅ Email OTP verification (6-digit code)
✅ OTP expiry (10 minutes)
✅ One-time password reset tokens
✅ Unique email constraints
✅ Input validation and sanitization
✅ CSRF protection via NextAuth

## 📝 API Endpoints

### Authentication Routes
- `POST /api/auth/signup` - Register new user (sends OTP)
- `POST /api/auth/verify-otp` - Verify email OTP
- `POST /api/auth/forgot-password` - Request password reset (sends OTP)
- `POST /api/auth/reset-password` - Reset password with OTP

### Send OTP (Internal)
- `POST /api/auth/send-otp` - Sends OTP via email

## 🚀 Deployment Checklist

- [ ] PostgreSQL database created
- [ ] DATABASE_URL added to Vercel environment
- [ ] Prisma migrations deployed
- [ ] Signup with OTP works
- [ ] Password reset works
- [ ] Signin with verified users works
- [ ] Error messages display correctly
- [ ] Email notifications sent successfully

## 🐛 Troubleshooting

**"Error code 14: Unable to open database file"**
- Means DATABASE_URL is pointing to SQLite file path on Vercel
- Solution: Use PostgreSQL connection string instead

**"Email not received"**
- Check spam folder
- Verify EMAIL_USER and EMAIL_PASS are correct
- Less secure apps might need to be enabled in Gmail

**"Prisma client generation failed"**
- Run: `npx prisma generate`
- Then redeploy to Vercel

**"OTP expired before use"**
- Default expiry is 10 minutes
- Change in `.env`: `OTP_EXPIRY_MINUTES=15`

## 📚 Local Development

To test locally with PostgreSQL:

1. Install PostgreSQL locally or use Docker
2. Create database: `createdb oneparasol`
3. Update `.env.local`:
   ```
   DATABASE_URL="postgresql://localhost/oneparasol"
   ```
4. Run migrations: `npx prisma migrate deploy`
5. Start dev server: `npm run dev`

## 🔄 Rollback to SQLite (Local Only)

If you need to switch back to SQLite for local testing:

1. Update `prisma/schema.prisma`:
   ```typescript
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

2. Update `.env`:
   ```
   DATABASE_URL="file:./prisma/dev.db?mode=rwc"
   ```

3. Run: `npx prisma migrate reset`

## 📞 Support Resources

- **Vercel Postgres Docs**: https://vercel.com/docs/postgres
- **Supabase Docs**: https://supabase.com/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **NextAuth.js Docs**: https://next-auth.js.org

---

**Last Updated**: 2025-01-15
**Status**: ✅ Complete - Ready for Production
