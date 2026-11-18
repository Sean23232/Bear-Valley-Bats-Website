import { useEffect, type ReactNode } from "react";
import { CartProvider } from "@/lib/cart";
import { useRoute } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { ROUTE_META } from "@/data/site";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Product from "@/pages/Product";
import Woods from "@/pages/Woods";
import Customization from "@/pages/Customization";
import Craftsmanship from "@/pages/Craftsmanship";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Design from "@/pages/Design";
import Cart from "@/pages/Cart";
import Policies from "@/pages/Policies";

function NotFound() {
  return (
    <section className="bg-ivory">
      <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
        <Eyebrow tone="walnut">Page not found</Eyebrow>
        <h1 className="mt-5 text-[clamp(2.8rem,6vw,5rem)] uppercase text-ink">This page is not on the bench.</h1>
        <p className="mt-6 max-w-xl font-sans text-[17px] leading-relaxed text-muted">
          The link may be out of date. Return to the homepage, or browse the collection to find what you need.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink to="/" variant="ink">
            Back to Home
          </ButtonLink>
          <ButtonLink to="/shop" variant="outlineDark">
            Shop Bats
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

function Site() {
  const { path } = useRoute();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [path]);

  useEffect(() => {
    const meta = ROUTE_META[path];
    if (meta) document.title = meta.title;
  }, [path]);

  let page: ReactNode;
  if (path === "/") page = <Home />;
  else if (path === "/faq") page = <Home scrollTo="faq" />;
  else if (path === "/shop") page = <Shop />;
  else if (path.startsWith("/shop/")) page = <Product slug={decodeURIComponent(path.slice("/shop/".length))} />;
  else if (path === "/wood") page = <Woods />;
  else if (path === "/customization") page = <Customization />;
  else if (path === "/craftsmanship") page = <Craftsmanship />;
  else if (path === "/about") page = <About />;
  else if (path === "/contact") page = <Contact />;
  else if (path === "/design") page = <Design />;
  else if (path === "/cart") page = <Cart />;
  else if (path === "/policies") page = <Policies />;
  else page = <NotFound />;

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main")?.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-gold focus:px-4 focus:py-2 focus:font-sans focus:text-[13px] focus:font-bold focus:text-charcoal"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {page}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Site />
    </CartProvider>
  );
}
