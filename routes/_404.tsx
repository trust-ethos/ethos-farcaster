import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div class="min-h-screen bg-gray-50 flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p class="text-xl text-gray-600 mb-8">Page not found</p>
          <a 
            href="/"
            class="bg-ethos-primary hover:bg-ethos-secondary text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Go back home
          </a>
        </div>
      </div>
    </>
  );
} 