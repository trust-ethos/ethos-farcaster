import { type Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
      const body = await req.text();
      console.log("Webhook received:", body);
      
      // Parse the webhook payload
      const payload = JSON.parse(body);
      
      // Handle different webhook events
      switch (payload.type) {
        case 'frame_click':
          console.log("Frame click event:", payload);
          break;
        case 'frame_added':
          console.log("Frame added event:", payload);
          break;
        case 'frame_removed':
          console.log("Frame removed event:", payload);
          break;
        default:
          console.log("Unknown webhook event:", payload.type);
      }
      
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      console.error("Webhook error:", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  },

  async OPTIONS() {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  },
}; 