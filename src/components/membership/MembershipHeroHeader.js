// src/components/MembershipHeroHeader.js
import React from 'react';

function MembershipHeroHeader() {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat text-black text-center"
    >
      <div className=" px-4 ">
        <h1 className=" text-3xl md:text-4xl font-extrabold mb-4">
          멤버십
        </h1>
        <p className="text-md md:text-lg font-light">
          작품 감상, 저장, 소장까지.<br/>
          당신에게 꼭 맞는 예술의 방식을 선택하세요.
        </p>
      </div>
    </section>
  );
}

export default MembershipHeroHeader;
