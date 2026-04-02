export const config = {
  runtime: 'edge', // ⚡️ 开启 Vercel 极速边缘节点运行
};

const apiMapping: Record<string, string> = {
  "/gemini": "https://generativelanguage.googleapis.com",
  "/gnothink": "https://generativelanguage.googleapis.com",
  "/groq": "https://api.groq.com/openai",
  "/gmi": "https://api.gmi-serving.com",
  "/openrouter": "https://openrouter.ai/api",
  "/chutes": "https://llm.chutes.ai",
  "/nebius": "https://api.studio.nebius.com"
};

const userAgents =[
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:102.0) Gecko/20100101 Firefox/102.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:102.0) Gecko/20100101 Firefox/102.0",
  "Mozilla/5.0 (iPad; CPU OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (WebOS/2.2.4; U; en-US) AppleWebKit/534.6 (KHTML, like Gecko) Safari/534.6 Pre/1.0",
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
  "curl/8.4.0",
  "Wget/1.21.3",
  "Python-urllib/3.11",
  "Go-http-client/1.1"
];

function getRandomUserAgent() {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

function generateSimplifiedHTML(requestUrl: string) {
  const url = new URL(requestUrl);
  const currentDomain = `${url.protocol}//${url.host}`;
  const openaiExampleTarget = apiMapping["/openai"] ? `${currentDomain}/openai/v1/chat/completions` : `(请先在 apiMapping 中配置 /openai 端点)`;
  const openaiOriginalExample = apiMapping["/openai"] ? `https://api.openai.com/v1/chat/completions` : `(示例原始OpenAI API)`;

  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API代理服务器 (Vercel Edge)</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); min-height: 100vh; padding: 20px; color: #fff; display: flex; align-items: center; justify-content: center; text-align: center; }
        .container { max-width: 700px; margin: 20px auto; background: rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 30px 40px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.18); }
        h1 { font-size: 2.2rem; margin-bottom: 15px; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        p { font-size: 1.1rem; opacity: 0.95; margin-bottom: 25px; line-height: 1.6; }
        h3 { font-size: 1.3rem; margin-top: 20px; margin-bottom: 15px; color: #e0e0e0; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 8px; }
        .endpoints-list { list-style: none; padding: 0; margin-bottom: 25px; text-align: left; }
        .endpoints-list li { background: rgba(255,255,255,0.08); padding: 10px 15px; margin-bottom: 10px; border-radius: 6px; font-family: 'Courier New', monospace; font-size: 0.95rem; color: #f0f0f0; word-break: break-all; }
        .endpoints-list li strong { color: #fff; }
        .usage-example { font-size: 0.95rem; color: #e0e0e0; background: rgba(0,0,0,0.15); padding: 20px; border-radius: 8px; text-align: left; line-height: 1.7; }
        .usage-example code { color: #ffdd57; background: rgba(0,0,0,0.2); padding: 2px 5px; border-radius: 4px; }
        .status-ok { color: #28a745; font-weight: bold; text-shadow: 0 0 5px rgba(0,0,0,0.3); }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 API代理服务器</h1>
        <p>服务正在 <span class="status-ok">Vercel Edge 极速运行中</span>。该代理转发请求到配置的目标API。</p>
        
        <h3>可用代理路径及目标:</h3>
        <ul class="endpoints-list">
            ${Object.entries(apiMapping).map(([prefix, target]) => `<li><strong>${currentDomain}${prefix}</strong>  ➔  ${target}</li>`).join('')}
        </ul>

        <div class="usage-example">
            <p><strong>使用方法:</strong></p>
            <p>将您的客户端配置为使用本代理服务器的地址，并带上相应的路径前缀。</p>
            <p>例如，如果您的原始请求是:</p>
            <p><code>${openaiOriginalExample}</code></p>
            <p>通过此代理，您应该使用:</p>
            <p><code>${openaiExampleTarget}</code></p>
            <p>同时支持网页资源通用代理：<code>${currentDomain}/proxy/https://google.com</code></p>
        </div>
    </div>
</body>
</html>`;
}

function extractPrefixAndRest(pathname: string, prefixes: string[]):[string | null, string | null] {
  for (const prefix of prefixes) {
    if (pathname.startsWith(prefix)) {
      return [prefix, pathname.slice(prefix.length)];
    }
  }
  return [null, null];
}

export default async function handler(request: Request): Promise<Response> {
  // ⚠️ 核心防 404 机制：精准剥离 Vercel 内部 Rewrite 路径
  const rawUrl = request.headers.get('x-forwarded-url') || request.url;
  const url = new URL(rawUrl);
  let pathname = url.pathname;
  
  if (pathname.startsWith('/api/proxy')) {
    pathname = pathname.substring('/api/proxy'.length) || '/';
  } else if (pathname.startsWith('/api')) {
    pathname = pathname.substring('/api'.length) || '/';
  }

  // ✅ 处理首页状态和 Robots
  if (pathname === "/" || pathname === "/index.html") {
    return new Response(generateSimplifiedHTML(request.url), {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  if (pathname === "/robots.txt") {
    return new Response("User-agent: *\nDisallow: /", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // ✅ 功能 1: 强大的通用网页反向代理 (/proxy/...)
  if (pathname.startsWith("/proxy/")) {
    try {
      // 修复 Vercel 可能会把 https:// 吞掉变成 https:/ 的底层 Bug
      let targetUrlString = pathname.substring(7) + url.search + url.hash;
      if (targetUrlString.startsWith("http:/") && !targetUrlString.startsWith("http://")) {
          targetUrlString = targetUrlString.replace("http:/", "http://");
      } else if (targetUrlString.startsWith("https:/") && !targetUrlString.startsWith("https://")) {
          targetUrlString = targetUrlString.replace("https:/", "https://");
      }

      if (!targetUrlString || !targetUrlString.startsWith("http")) {
          return new Response("Invalid proxy URL. Must start with http:// or https:// after /proxy/", { status: 400 });
      }
      const targetUrl = new URL(targetUrlString);
      const baseUrl = `${targetUrl.protocol}//${targetUrl.host}`;

      const headers = new Headers();
      const allowedHeaders =["accept", "content-type", "authorization", "accept-encoding", "accept-language", "cache-control", "pragma", "x-requested-with"];
      
      request.headers.forEach((value, key) => {
        const k = key.toLowerCase();
        if (allowedHeaders.includes(k) || k.startsWith("sec-") || k.startsWith("x-")) {
          // 清除 Vercel 自己的内部干扰 Header
          if (!k.includes('vercel') && !k.includes('x-forwarded')) {
             headers.set(key, value);
          }
        }
      });
      if (!headers.has("user-agent")) headers.set("user-agent", getRandomUserAgent());
      if (request.headers.has("referer")) headers.set("Referer", request.headers.get("referer")!.replace(url.origin, targetUrl.origin));

      const response = await fetch(targetUrl.toString(), {
        method: request.method,
        headers: headers,
        body: request.method !== "GET" && request.method !== "HEAD" ? request.body : undefined,
        redirect: "manual"
      });

      const responseHeaders = new Headers(response.headers);
      const origin = request.headers.get("Origin");
      if (origin) {
        responseHeaders.set("Access-Control-Allow-Origin", origin);
        responseHeaders.set("Access-Control-Allow-Credentials", "true");
      } else {
        responseHeaders.set("Access-Control-Allow-Origin", "*");
      }
      responseHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH");
      responseHeaders.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, " + allowedHeaders.join(", "));
      responseHeaders.set("Access-Control-Max-Age", "86400");
      
      responseHeaders.set("X-Content-Type-Options", "nosniff");
      responseHeaders.delete("X-Frame-Options");
      responseHeaders.set("Referrer-Policy", "no-referrer-when-downgrade");

      if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: responseHeaders });
      
      // 处理重定向
      if (response.status >= 300 && response.status < 400 && response.headers.has("location")) {
          let newLocation = response.headers.get("location")!;
          if (newLocation.startsWith("/")) newLocation = `${baseUrl}${newLocation}`;
          if (newLocation) responseHeaders.set("Location", `${url.origin}/proxy/${newLocation}`);
          return new Response(null, { status: response.status, headers: responseHeaders });
      }

      // 强大的 HTML/CSS 内容重写引擎 (相对路径替换)
      const contentType = responseHeaders.get("content-type") || "";
      if (contentType.includes("text/html")) {
        let text = await response.text();
        const currentProxyBase = `${url.origin}/proxy/`;
        text = text.replace(/(href|src|action)=["']\/(?!\/)/gi, `$1="${currentProxyBase}${baseUrl}/`);
        text = text.replace(/(href|src|action)=["'](https?:\/\/[^"']+)/gi, (match, attr, originalUrl) => `${attr}="${currentProxyBase}${originalUrl}"`);
        text = text.replace(/srcset=["']([^"']+)["']/gi, (match, srcset) => {
            const newSrcset = srcset.split(',').map(s => {
                const parts = s.trim().split(/\s+/);
                let u = parts[0];
                if (u.startsWith('/')) u = `${baseUrl}${u}`;
                return `${currentProxyBase}${u}${parts[1] ? ' ' + parts[1] : ''}`;
            }).join(', ');
            return `srcset="${newSrcset}"`;
        });
        text = text.replace(/\s+integrity=["'][^"']+["']/gi, '');
        text = text.replace(/<base\s+href=["']([^"']+)["'][^>]*>/gi, (match, baseHrefVal) => {
            let newBase = baseHrefVal;
            if(baseHrefVal.startsWith('/')) newBase = `${baseUrl}${baseHrefVal}`;
            return `<base href="${currentProxyBase}${newBase}">`;
        });
        return new Response(text, { status: response.status, headers: responseHeaders });
      } else if (contentType.includes("text/css")) {
        let text = await response.text();
        const currentProxyBase = `${url.origin}/proxy/`;
        text = text.replace(/url\(([^)]+)\)/gi, (match, cssUrl) => {
            let u = cssUrl.trim().replace(/["']/g, '');
            if (u.startsWith('data:') || u.startsWith('#')) return match;
            if (u.startsWith('/')) u = `${baseUrl}${u}`;
            else if (!u.startsWith('http')) u = `${new URL(u, targetUrl.toString()).href}`;
            return `url(${currentProxyBase}${u})`;
        });
        return new Response(text, { status: response.status, headers: responseHeaders });
      }
      
      return new Response(response.body, { status: response.status, headers: responseHeaders });
    } catch (error: any) {
      return new Response("Proxy Request Failed: " + error.message, { status: 502 });
    }
  }

  // ✅ 功能 2: API 接口路由匹配 (您的核心业务)
  const[prefix, rest] = extractPrefixAndRest(pathname, Object.keys(apiMapping));
  if (!prefix) {
    return new Response(JSON.stringify({
      error: "Not Found",
      message: "The requested path does not match any configured API prefixes.",
      available_prefixes: Object.keys(apiMapping)
    }), { status: 404, headers: {"Content-Type": "application/json"} });
  }

  const targetApiUrl = `${apiMapping[prefix]}${rest}${url.search}`;

  try {
    const headers = new Headers();
    const commonApiHeaders =["content-type", "authorization", "accept", "anthropic-version"];
    
    request.headers.forEach((value, key) => {
        const lowerKey = key.toLowerCase();
        if (commonApiHeaders.includes(lowerKey) || lowerKey.startsWith("x-")) {
            // 同样拦截掉可能导致上游报错的 Vercel Headers
            if (!lowerKey.includes('vercel') && !lowerKey.includes('forwarded')) {
               headers.set(key, value);
            }
        }
    });
    
    if (prefix === "/claude" && !headers.has("anthropic-version")) {
        headers.set("anthropic-version", "2023-06-01");
    }
    
    if (!headers.has("user-agent")) {
        headers.set("user-agent", getRandomUserAgent());
    }

    let requestBody: BodyInit | null | undefined = undefined;

    // 🌟 Gnothink 特殊注入逻辑：0 预算深度思考
    if (prefix === "/gnothink" && request.method === "POST" && (headers.get("content-type") || "").includes("application/json")) {
      const originalBodyText = await request.clone().text(); // Vercel 下安全克隆读取
      if (originalBodyText) {
        try {
            const bodyJson = JSON.parse(originalBodyText);
            bodyJson.generationConfig = { ...(bodyJson.generationConfig || {}), thinkingConfig: { thinkingBudget: 0 }};
            requestBody = JSON.stringify(bodyJson);
        } catch (e) {
            requestBody = originalBodyText; // 解析失败原样转发
        }
      } else {
        requestBody = null;
      }
    } else if (request.method !== "GET" && request.method !== "HEAD") {
      requestBody = request.body; // 正常透传体 (原生流)
    }

    const apiResponse = await fetch(targetApiUrl, {
      method: request.method,
      headers: headers,
      body: requestBody,
      redirect: "follow"
    });

    const responseHeaders = new Headers(apiResponse.headers);
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    responseHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH");
    responseHeaders.set("Access-Control-Allow-Headers", "Content-Type, Authorization, anthropic-version, " + commonApiHeaders.join(", "));
    responseHeaders.set("X-Content-Type-Options", "nosniff");
    responseHeaders.set("X-Frame-Options", "DENY");
    responseHeaders.set("Referrer-Policy", "no-referrer");

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: responseHeaders });
    }

    // Vercel Edge 原生支持流式透传（打字机效果极度丝滑！）
    return new Response(apiResponse.body, {
      status: apiResponse.status,
      headers: responseHeaders,
    });
  } catch (error: any) {
    return new Response(`Internal Server Error during API proxy for ${prefix}. Details: ${error.message}`, { status: 500 });
  }
}
