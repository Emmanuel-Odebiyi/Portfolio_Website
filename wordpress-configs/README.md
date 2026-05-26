# WordPress Permalinks & Dashboard 404 Solutions

If you are hosting WordPress (e.g., on Hostinger, Namecheap, Bluehost, or a custom VPS) and find that visiting the admin dashboard (`/wp-admin` or `/wp-login.php`) or inner pages returns a **404 Not Found** or gets stuck in a redirection loop, it is usually because the web server does not know how to handle WordPress dynamic routing (permalinks).

This folder contains the official, production-ready server configurations to resolve this issue permanently.

---

## 📂 Which configuration should you use?

Select the configuration file that matches your WordPress web server:

### 1. For Apache / LiteSpeed Servers (Most Shared Hosting Providers)
If your host uses Apache or LiteSpeed (e.g., standard hosting with cPanel, Hostinger Shared Hosting, etc.):
* **File to use**: `.htaccess`
* **What to do**:
  1. Copy the contents of [.htaccess](.htaccess) inside this folder.
  2. Log into your hosting control panel (cPanel or hPanel File Manager).
  3. Go to your WordPress root installation directory (usually `public_html`).
  4. Ensure "Show Hidden Files" is enabled in your File Manager settings.
  5. Locate or create a file named `.htaccess` in the root directory.
  6. Paste the contents into the file and save.

### 2. For Nginx Servers (VPS, Cloud Instances, RunCloud, SpinupWP)
If your host uses Nginx (e.g., DigitalOcean, Linode, AWS, custom Nginx setup):
* **File to use**: `nginx.conf`
* **What to do**:
  1. Open your Nginx site configuration file (typically found at `/etc/nginx/sites-available/your-domain.conf`).
  2. Inside the main `server { ... }` block, find the `location /` directive and replace it with the configuration provided in [nginx.conf](nginx.conf).
  3. Reload Nginx to apply the changes:
     ```bash
     sudo nginx -t
     sudo systemctl reload nginx
     ```

---

## 💡 Troubleshooting Dashboard Redirect Loops
If the 404 or redirect loop persists after adding these files, double-check these two common WordPress settings:

1. **WordPress URL Mismatches (HTTPS vs HTTP)**:
   If your SSL certificate is active but your WordPress database is configured to use `http://` instead of `https://`, it will loop indefinitely.
   * **Fix**: Edit your `wp-config.php` file (located in your WordPress root directory) and add these two lines near the top:
     ```php
     define('WP_HOME', 'https://yourdomain.com');
     define('WP_SITEURL', 'https://yourdomain.com');
     ```
     *(Replace `yourdomain.com` with your actual domain).*

2. **Cloudflare SSL Encryption Settings**:
   If you have linked your domain to Cloudflare, ensure your **SSL/TLS encryption mode** is set to **Full** or **Full (strict)**.
   * **Why**: If it is set to **Flexible**, Cloudflare requests your server over HTTP, but your WordPress server redirects HTTP requests to HTTPS, leading to an infinite redirection loop.
