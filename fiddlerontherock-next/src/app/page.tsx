import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import CBSSection from "@/components/CBSSection";
import ExperienceCards from "@/components/ExperienceCards";
import Testimonials from "@/components/Testimonials";
import EmailSignup from "@/components/EmailSignup";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CBSSection />
        <ExperienceCards />
        <Testimonials />
        <EmailSignup />
      </main>
      <Footer />
    </>
  );
}
