import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define your application routes
let routes = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/about',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/contact',
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  }
];

// Configuration
const config = {
  baseUrl: 'https://ebook-formatter.vercel.app/', // Update this with your actual domain
  outputPath: '../public/sitemap.xml'
};

function generateSitemap(routes: any[]) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${config.baseUrl}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

async function buildSitemap() {
  try {
    // Update lastmod dates before generating
    updateLastModDates();
    
    const sitemapContent = generateSitemap(routes);
    const publicDir = path.resolve(__dirname, config.outputPath, '..');
    
    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    const sitemapPath = path.resolve(__dirname, config.outputPath);
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
    
    console.log('✅ Sitemap generated successfully at:', sitemapPath);
    console.log(`📄 Sitemap contains ${routes.length} routes`);
    console.log('🌐 Base URL:', config.baseUrl);
    
    // Log the routes that were included
    console.log('\n📋 Routes included in sitemap:');
    routes.forEach(route => {
      console.log(`   - ${route.path} (Priority: ${route.priority}, Frequency: ${route.changefreq}, Last Modified: ${route.lastmod})`);
    });
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Function to update lastmod dates (useful for automated updates)
function updateLastModDates() {
  const today = new Date().toISOString().split('T')[0];
  routes = routes.map(route => ({
    ...route,
    lastmod: today
  }));
}

// Function to add new routes dynamically
function addRoute(path: string, priority: string = '0.5', changefreq: string = 'monthly') {
  routes.push({
    path,
    priority,
    changefreq,
    lastmod: new Date().toISOString().split('T')[0]
  });
}

// Export functions for potential use in other scripts
export { buildSitemap, updateLastModDates, addRoute, generateSitemap };

// Run the sitemap generation
buildSitemap(); 
