import MembershipHeroHeader from '../components/membership/MembershipHeroHeader';
import MembershipPricingSection from '../components/membership/MembershipPricingSection';
import MembershipNoticesSection from '../components/membership/MembershipNoticesSection';
import FadeInWhenVisible from '../components/common/FadeInWhenVisible'; // ✅ import 추가

function MembershipPage() {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-white text-gray-800 py-32">
      <FadeInWhenVisible>
        <MembershipHeroHeader />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1}>
        <MembershipPricingSection />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.2}>
        <MembershipNoticesSection />
      </FadeInWhenVisible>
    </div>
  );
}

export default MembershipPage;
