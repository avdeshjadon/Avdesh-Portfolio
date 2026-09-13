import Nav from "@/components/layout/Nav";
import Scene from "@/components/layout/Scene";
import TunnelIntro from "@/components/sections/Intro/TunnelIntro";
import Hero from "@/components/sections/Hero/Hero";
import About from "@/components/sections/About/About";
import Journey from "@/components/sections/Journey/LightJourney";
import DesignStack from "@/components/sections/Stack/DesignStack";
import CreativeStory from "@/components/sections/CreativeStory/CreativeStory";
import Work from "@/components/sections/Work/Work";
import Experience from "@/components/sections/Experience/Experience";
import Certifications from "@/components/sections/Certifications/Certifications";
import Gallery from "@/components/sections/Gallery/Gallery";
import Connect from "@/components/sections/Connect/Connect";

/*
 * THE STACK.
 *
 * Every frame is a Scene: a runway that owns scroll distance, holding a
 * sticky full-screen stage. Scenes are painted in ascending order, so the
 * next one rises from the bottom of the viewport and COVERS the one before
 * it — the previous frame stays put behind it rather than scrolling away.
 * Native sticky does the work, so the movement is exactly scrubbable: stop
 * halfway and the incoming frame stays halfway across.
 *
 * `runway` is the extra scroll length a scene needs for its interior to play
 * (tunnel travel, chapters, the card arc, the decks, the drift wall). A scene
 * with no runway is a single held frame that the next one covers straight
 * away.
 *
 * Connect is last and deliberately NOT a Scene: it is taller than the
 * viewport and ends the page, so it rises over the Gallery and then scrolls
 * naturally into the footer.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* keepOnMobile: these three fill one screen at any size, so they stay
            cinematic frames on phones too. The rest release into normal flow —
            their mobile layouts are tall and a fixed frame would clip them. */}
        <Scene order={1} runway={6} id="intro" keepOnMobile>
          <TunnelIntro />
        </Scene>

        <Scene order={2} id="hero">
          <Hero />
        </Scene>

        <Scene order={3} id="about">
          <About />
        </Scene>

        <Scene order={4} runway={6} id="journey" keepOnMobile>
          <Journey />
        </Scene>

        <Scene order={5} id="stack">
          <DesignStack />
        </Scene>

        {/* THE CREATIVE STORY — a faithful port of the software-Developer
            project's creative chapter (its Sections 02 + 03) as ONE scene:
            My Creative Hunch scrubs in, then its lockup dismantles into the
            puzzle fragments while the About Me chapter assembles behind the
            departing pieces and locks interactive. scratch-band width is the
            whole runway; kept as a full-screen frame on phones. */}
        <Scene order={6} runway={6} id="creative" keepOnMobile>
          <CreativeStory />
        </Scene>

        <Scene order={7} runway={4.5} id="work">
          <Work />
        </Scene>

        <Scene order={8} runway={4.4} id="experience">
          <Experience />
        </Scene>

        <Scene order={9} runway={3.5} id="credentials">
          <Certifications />
        </Scene>

        <Scene order={10} runway={1.6} id="gallery" keepOnMobile>
          <Gallery />
        </Scene>

        {/* the closing frame rises over the gallery, then flows to the footer */}
        <div className="finalFrame">
          <Connect />
        </div>
      </main>
    </>
  );
}
