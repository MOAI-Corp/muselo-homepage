import HeroSection from '../components/home/HeroSection';
import ProductStorySection from '../components/home/ProductStorySection';
import FrameOptionSection from '../components/home/FrameOptionSection';
import FrameMountVideoSection from '../components/home/FrameMountVideoSection';
import PromotionBannerSection from '../components/home/PromotionBannerSection';
import BuyFloatingButton from '../components/common/BuyFloatingButton';
import ScrollToTopButton from '../components/common/ScrollToTopButton';
import BrandStorySection from '../components/home/BrandStorySection';
import SimpleMembershipSection from '../components/home/SimpleMembershipSection';
import FadeInWhenVisible from '../components/common/FadeInWhenVisible';
import KakaoChatButton from '../components/common/KakaoChatButton';


function Home() {
  return (
    <div className="bg-white text-gray-800">
      <HeroSection />

      <FadeInWhenVisible>
        <BrandStorySection id="brandstory" />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1}>
        <ProductStorySection id="product" />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.2}>
        <FrameOptionSection />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.3}>
        <FrameMountVideoSection />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.4}>
        <PromotionBannerSection />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.5}>
        <SimpleMembershipSection />
      </FadeInWhenVisible>

      <BuyFloatingButton />
      <ScrollToTopButton />
      <KakaoChatButton />
    </div>
  );
}

export default Home;
