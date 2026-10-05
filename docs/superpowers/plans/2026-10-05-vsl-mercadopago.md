# VSL Mercado Pago & Firebase Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Mercado Pago checkout and Firebase lead capture into a static HTML VSL landing page, redirecting users to an external dashboard upon successful payment, and adding a trust badge to the footer.

**Architecture:** 
- The frontend is pure HTML/JS (no bundler).
- Firebase is imported via CDN in `index.html` to save leads directly to Firestore before payment.
- A Netlify Function (`/.netlify/functions/create-preference`) serves as the backend to safely generate the Mercado Pago preference using secret environment variables.

**Tech Stack:** HTML/CSS/Vanilla JS, Firebase Web SDK (CDN), Netlify Functions (Node.js), MercadoPago Node SDK.

**Spec:** VSL Checkout Implementation for Site-IA.

## Global Constraints
- Target success URL: `https://seusite-unico.vercel.app/dashboard`
- Must use the same Firebase Project as the main app.
- Node.js environment for Netlify functions requires a `package.json` at the root.

---

### Task 1: Initialize Backend & Footer Asset

**Files:**
- Create: `package.json`
- Create: `public/img/mercado-pago-badges.png` (Copy from provided media)
- Modify: `index.html:900-1000` (Footer section)

- [ ] **Step 1: Create package.json for Netlify Functions**
```bash
npm init -y
npm install mercadopago@1.5.17
```

- [ ] **Step 2: Copy the uploaded media to the images folder**
```bash
mkdir -p public/img
cp "C:/Users/aless/.gemini/antigravity/brain/ac819571-7a4e-49f1-9548-3dbb520f3c77/.user_uploaded/media_1791229055952.png" public/img/mercado-pago-badges.png
```

- [ ] **Step 3: Add the image to the footer in `index.html`**
Find the footer section and insert:
```html
<div style="text-align: center; margin-top: 30px;">
  <img src="public/img/mercado-pago-badges.png" alt="Pagamento Seguro Mercado Pago" style="max-width: 100%; height: auto; max-height: 80px; object-fit: contain;">
</div>
```

- [ ] **Step 4: Commit**
```bash
git add package.json package-lock.json public/img/mercado-pago-badges.png index.html
git commit -m "chore: setup backend deps and add MP footer badge"
```

### Task 2: Netlify Function (Mercado Pago Backend)

**Files:**
- Create: `netlify/functions/create-preference.js`

- [ ] **Step 1: Write the Netlify Function**
```javascript
const mercadopago = require("mercadopago");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN || "TEST-dummy-token"
  });

  try {
    const { name, email, planKey } = JSON.parse(event.body);

    const preference = {
      items: [
        {
          title: "Acesso Completo - Site Inteligente",
          unit_price: 47.90,
          quantity: 1,
        }
      ],
      payer: {
        name: name,
        email: email,
      },
      back_urls: {
        success: "https://seusite-unico.vercel.app/dashboard",
        failure: "https://seusite-ia.netlify.app/",
        pending: "https://seusite-ia.netlify.app/"
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: response.body.id,
        init_point: response.body.init_point,
        sandbox_init_point: response.body.sandbox_init_point
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to create preference" }),
    };
  }
};
```

- [ ] **Step 2: Commit**
```bash
git add netlify/functions/create-preference.js
git commit -m "feat: add netlify function for mercado pago preference"
```

### Task 3: Firebase Configuration & Checkout Modal UI

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Inject Firebase SDKs and Configuration in `<head>`**
Must match exactly the Firebase Config from the `seu-site-unico` project. Since this is vanilla JS, we use the compat or standard CDN links.

- [ ] **Step 2: Add Checkout Modal HTML/CSS**
Add a clean CSS and HTML structure for a modal (Name, Email, Phone) that is hidden by default (`display: none`).

- [ ] **Step 3: Commit**
```bash
git add index.html
git commit -m "feat: add firebase CDN and checkout modal UI"
```

### Task 4: Vanilla JS Checkout Logic

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Intercept `[data-checkout]` clicks**
Instead of redirecting to a static link, `document.querySelectorAll('[data-checkout]')` should open the modal.

- [ ] **Step 2: Handle Form Submit**
```javascript
// 1. Save to Firestore (collection: "leads_vsl")
// 2. fetch('/.netlify/functions/create-preference', { method: 'POST', body: JSON.stringify({...}) })
// 3. window.location.href = response.init_point
```

- [ ] **Step 3: Commit**
```bash
git add index.html
git commit -m "feat: implement checkout flow with firebase and mp"
```
