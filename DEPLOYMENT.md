# 🚀 Wanterio Deployment Guide

This guide will help you deploy your Wanterio healthcare platform to various hosting providers.

## 📋 Pre-deployment Checklist

- [ ] Supabase database schema applied
- [ ] Environment variables configured
- [ ] Email confirmation disabled in Supabase
- [ ] Sample data loaded (optional)
- [ ] All features tested locally

## 🌐 Deployment Options

### 1. Vercel (Recommended)

Vercel provides the best Next.js deployment experience with automatic builds and deployments.

#### Steps:
1. **Connect GitHub Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xvloqzbvjrehkuixhjtd.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app
   - Get your live URL: `https://your-app.vercel.app`

#### Custom Domain (Optional):
- Add your custom domain in Vercel dashboard
- Update DNS records as instructed
- SSL certificate is automatically provisioned

### 2. Netlify

#### Steps:
1. **Connect Repository**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `out`

3. **Environment Variables**
   - Go to Site settings → Environment variables
   - Add the same variables as above

### 3. Railway

#### Steps:
1. **Connect GitHub**
   - Go to [Railway Dashboard](https://railway.app)
   - Click "New Project"
   - Deploy from GitHub repo

2. **Environment Variables**
   - Add variables in the Variables tab
   - Railway will automatically detect Next.js

### 4. DigitalOcean App Platform

#### Steps:
1. **Create App**
   - Go to DigitalOcean Control Panel
   - Click "Create" → "Apps"
   - Connect your GitHub repository

2. **Configure Build**
   - Build command: `npm run build`
   - Run command: `npm start`

## 🔧 Environment Configuration

### Production Environment Variables
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xvloqzbvjrehkuixhjtd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

### Supabase Production Setup

1. **Database Configuration**
   - Ensure all migrations are applied
   - Verify RLS policies are active
   - Check indexes for performance

2. **Authentication Settings**
   - Update site URL to your production domain
   - Configure redirect URLs
   - Set up email templates (if using email confirmation)

3. **API Settings**
   - Add your production domain to allowed origins
   - Configure CORS settings

## 🔒 Security Considerations

### 1. Environment Variables
- Never commit `.env.local` to version control
- Use different Supabase projects for staging/production
- Rotate API keys regularly

### 2. Domain Security
- Enable HTTPS (automatic with most providers)
- Configure proper CORS settings
- Set up CSP headers if needed

### 3. Database Security
- Review RLS policies
- Monitor database access logs
- Set up database backups

## 📊 Monitoring & Analytics

### 1. Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to your layout:
```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 2. Supabase Monitoring
- Monitor database performance
- Set up alerts for high usage
- Review authentication logs

## 🚨 Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

2. **Environment Variable Issues**
   - Ensure all required variables are set
   - Check variable names (case-sensitive)
   - Verify Supabase URLs and keys

3. **Database Connection Issues**
   - Verify Supabase project is active
   - Check API keys are correct
   - Ensure RLS policies allow access

4. **Authentication Problems**
   - Update site URL in Supabase settings
   - Configure redirect URLs
   - Check email confirmation settings

## 📈 Performance Optimization

### 1. Next.js Optimizations
- Enable image optimization
- Use dynamic imports for large components
- Implement proper caching strategies

### 2. Database Optimizations
- Add indexes for frequently queried columns
- Use database functions for complex queries
- Implement proper pagination

### 3. CDN Configuration
- Most hosting providers include CDN
- Configure caching headers
- Optimize static assets

## 🔄 CI/CD Pipeline

### GitHub Actions Example:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 Support

If you encounter issues during deployment:
- Check the hosting provider's documentation
- Review Supabase logs and metrics
- Join our Discord community for help
- Create an issue on GitHub

---

**Happy Deploying! 🚀**