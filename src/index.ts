export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Serve index for root
    if (path === '/' || path === '/index.html') {
      return new Response(INDEX_HTML, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    // 404 for everything else
    return new Response('Not found', { status: 404 });
  },
};

interface Env {}

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog - The Archive of American Radio</title>
    <style>
        :root {
            --bg: #fff;
            --text: #000;
            --text-secondary: #666;
            --border: #e5e5e5;
            --hover: #f5f5f5;
        }

        @media (prefers-color-scheme: dark) {
            :root {
                --bg: #000;
                --text: #fff;
                --text-secondary: #888;
                --border: #222;
                --hover: #111;
            }
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        html, body {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif;
            background: var(--bg);
            color: var(--text);
            font-size: 15px;
            -webkit-font-smoothing: antialiased;
        }

        .wrapper {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            min-height: 100vh;
        }

        .hamburger {
            display: none;
            position: fixed;
            top: 16px;
            left: 16px;
            z-index: 1000;
            background: var(--bg);
            border: 1px solid var(--border);
            border-radius: 6px;
            padding: 8px 12px;
            cursor: pointer;
            font-size: 18px;
        }

        .sidebar {
            width: 200px;
            padding: 32px 16px;
            border-right: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        @media (max-width: 768px) {
            .hamburger { display: block; }
            .sidebar {
                position: fixed;
                top: 0;
                left: 0;
                height: 100vh;
                width: 240px;
                background: var(--bg);
                z-index: 999;
                transform: translateX(-100%);
                transition: transform 0.2s ease;
                padding-top: 64px;
            }
            .sidebar.open { transform: translateX(0); }
            .overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 998;
            }
            .overlay.open { display: block; }
            .container { padding-top: 56px; }
        }

        .sidebar-item {
            display: block;
            padding: 8px 12px;
            border-radius: 6px;
            text-decoration: none;
            color: var(--text-secondary);
            font-size: 14px;
            font-weight: 500;
            transition: all 0.15s;
        }

        .sidebar-item:hover {
            background: var(--hover);
            color: var(--text);
        }

        .sidebar-item.active {
            background: var(--hover);
            color: var(--text);
        }

        .container {
            flex: 1;
            padding: 32px 40px;
            max-width: 600px;
        }

        @media (max-width: 768px) {
            .container { padding: 24px 20px; }
        }

        .right-col {
            display: none;
            width: 300px;
            padding: 32px 24px;
            border-left: 1px solid var(--border);
        }

        @media (min-width: 1024px) {
            .right-col { display: block; }
        }

        h1 {
            font-size: 28px;
            font-weight: 600;
            letter-spacing: -0.02em;
            margin-bottom: 8px;
        }

        .subtitle {
            color: var(--text-secondary);
            font-size: 14px;
            margin-bottom: 32px;
        }

        .post-link {
            display: block;
            padding: 16px 0;
            text-decoration: none;
            color: var(--text);
            border-bottom: 1px solid var(--border);
            transition: opacity 0.15s;
        }

        .post-link:hover { opacity: 0.6; }

        .post-date {
            font-size: 12px;
            color: var(--text-secondary);
            margin-bottom: 4px;
        }

        .post-title {
            font-size: 15px;
            font-weight: 500;
        }

        .post-excerpt {
            font-size: 13px;
            color: var(--text-secondary);
            margin-top: 6px;
            line-height: 1.4;
        }

        .right-col h2 {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 16px;
        }

        .right-col p {
            font-size: 13px;
            color: var(--text-secondary);
            line-height: 1.5;
            margin-bottom: 16px;
        }

        .right-col a {
            color: var(--text);
            text-decoration: none;
        }

        .right-col a:hover {
            text-decoration: underline;
        }

        .coming-soon {
            padding: 48px 0;
            text-align: center;
            color: var(--text-secondary);
        }

        .coming-soon h2 {
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 8px;
            color: var(--text);
        }
    </style>
</head>
<body>
    <button class="hamburger" onclick="toggleMenu()">☰</button>
    <div class="overlay" onclick="toggleMenu()"></div>
    <div class="wrapper">
        <div class="sidebar">
            <a href="/" class="sidebar-item active">Blog</a>
            <a href="https://archiveofamericanradio.org" class="sidebar-item">Main Site</a>
            <a href="https://search.archiveofamericanradio.org" class="sidebar-item">Search</a>
            <a href="https://radio.archiveofamericanradio.org" class="sidebar-item">Live Radio</a>
        </div>
        <div class="container">
            <h1>Blog</h1>
            <p class="subtitle">The Archive of American Radio</p>

            <!-- POSTS LIST - newest first -->
            <div class="coming-soon">
                <h2>Coming Soon</h2>
                <p>We're working on our first post. Check back shortly.</p>
            </div>

        </div>
        <div class="right-col">
            <h2>About</h2>
            <p>The Archive of American Radio is a 501(c)(3) nonprofit preserving and providing access to classic American radio dramas.</p>
            <p>237,000+ episodes. 26+ series. Free to listen.</p>
            <p><a href="https://archiveofamericanradio.org">Visit the archive &#8594;</a></p>
        </div>
    </div>
    <script>
        function toggleMenu() {
            document.querySelector('.sidebar').classList.toggle('open');
            document.querySelector('.overlay').classList.toggle('open');
        }
    </script>
</body>
</html>`;
