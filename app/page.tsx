import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header';
import Main from './components/layout/main/Main';
import Navigation from './components/layout/navigation/Navigation';
import HotTopics from './components/sections/HotTopics';
import DevelopmentSection from './components/sections/DevelopmentSection';
import WebDesignSection from './components/sections/WebDesignSection';
import GraphicDesignSection from './components/sections/GraphicDesignSection';
import PortfolioSection from './components/sections/PortfolioSection';
import ClientsSection from './components/sections/ClientsSection';
import NewsSection from './components/sections/NewsSection';
import ContactSection from './components/sections/ContactSection';
import MapSection from './components/sections/MapSection';
import Sidebar from './components/layout/sedebar/Sidebar';
import TabletSidebar from './components/layout/sedebar/TabletSidebar';
import MobileSidebar from './components/layout/sedebar/MobileSidebar';

export default function Home() {
  return (
    <div className='min-h-screen'>
      <TabletSidebar />
      <MobileSidebar />
      <div className='min-h-screen grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)_40px] gap-x-10 px-0 lg:px-4'>
        <Sidebar />

        <main className='min-w-0 flex flex-col'>
          <Header />
          <Main className='flex-1'>
            <HotTopics />
            <DevelopmentSection />
            <WebDesignSection />
            <GraphicDesignSection />
            <PortfolioSection />
            <ClientsSection />
            <NewsSection />
            <ContactSection />
            <MapSection />
          </Main>
          <Footer />
        </main>

        <Navigation />
      </div>
    </div>
  );
}
