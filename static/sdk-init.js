// Initialize the Farcaster Mini App SDK
import { sdk } from "https://esm.sh/@farcaster/miniapp-sdk@0.1.0";

console.log("Initializing Farcaster Mini App SDK...");

// Initialize the SDK when the page loads
window.addEventListener('DOMContentLoaded', async () => {
  try {
    // Signal that the app is ready
    await sdk.actions.ready();
    console.log("Mini App SDK initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Mini App SDK:", error);
  }
}); 