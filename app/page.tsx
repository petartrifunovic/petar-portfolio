import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header';
import Main from './components/layout/main/Main';
import Navigation from './components/layout/navigation/Navigation';
import MobileNavigation from './components/layout/navigation/MobileNavigation';
import HotTopics from './components/sections/HotTopics';
import DevelopmentSection from './components/sections/DevelopmentSection';
import WebDesignSection from './components/sections/WebDesignSection';
import GraphicDesignSection from './components/sections/GraphicDesignSection';
import PortfolioSection from './components/sections/PortfolioSection';
import ClientsSection from './components/sections/ClientsSection';
import JournalSection from './components/sections/JournalSection';
import ContactSection from './components/sections/ContactSection';
import MapSection from './components/sections/MapSection';
import Reveal from './components/motion/Reveal';
import Sidebar from './components/layout/sedebar/Sidebar';
import TabletSidebar from './components/layout/sedebar/TabletSidebar';
import MobileSidebar from './components/layout/sedebar/MobileSidebar';

export default function Home() {
  return (
    <div className='min-h-screen'>
      <MobileNavigation />
      <TabletSidebar />
      <MobileSidebar />
      <div className='min-h-screen grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)_40px] gap-x-10 px-0 lg:px-4'>
        <Sidebar />
        <div className='min-w-0 flex flex-col'>
          <Reveal>
            <Header />
          </Reveal>
          <Main className='flex-1'>
            {[
              <HotTopics key='hot-topics' />,
              <DevelopmentSection key='development' />,
              <WebDesignSection key='web-design' />,
              <GraphicDesignSection key='graphic-design' />,
              <PortfolioSection key='portfolio' />,
              <ClientsSection key='clients' />,
              <JournalSection key='journal' />,
              <ContactSection key='contact' />,
              <MapSection key='map' />,
            ].map((section) => (
              <Reveal key={section.key}>{section}</Reveal>
            ))}
          </Main>
          <Footer />
        </div>
        <Navigation />
      </div>
    </div>
  );
}
