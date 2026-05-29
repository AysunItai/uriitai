import About from "./components/About";
import Conversation from "./components/Conversation";
import Correspondence from "./components/Correspondence";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import Nav from "./components/Nav";
import Trajectory from "./components/Trajectory";
import Writing from "./components/Writing";

export default function Page() {
  return (
    <>
      <Nav />
      <main className="relative">
        <Hero />
        <Manifesto />
        <About />
        <Trajectory />
        <Writing />
        <Conversation />
        <Correspondence />
      </main>
      <Footer />
    </>
  );
}
