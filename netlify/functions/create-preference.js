const mercadopago = require("mercadopago");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Configurar credenciais de produção e fallback de dev
  mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN || "APP_USR-7889311681577903-092518-868846c2688ff7dd6fba94bd38392182-132326756" // Default mock from the other project for dev purposes if undefined
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
      notification_url: "https://seusite-unico.vercel.app/api/webhook",
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

