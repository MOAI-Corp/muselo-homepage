import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { ref, deleteObject } from 'firebase/storage';
import BannerEditorModal from '../components/BannerEditorModal';

function ManageBannerPage() {
  const [banners, setBanners] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'homepage_banners'),
      (snapshot) => {
        setBanners(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    );
    return () => unsubscribe();
  }, []);

  const deleteBanner = async (id, imageUrl) => {
    await deleteDoc(doc(db, 'homepage_banners', id));
    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    }
  };

  return (
    <div className="space-y-4 ">
      <h1 className="text-2xl font-bold">배너 관리</h1>
      <div className="flex justify-between items-center mb-4">
        <p 
          className="text-gray-500">배너는 3개까지만 등록해주세요.
          </p>
        <button onClick={() => setIsModalOpen(true)} 
        className="
          bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition
        ">배너 등록</button>
      </div>
      {banners.map((banner) => (
        <div key={banner.id} className="border p-4 flex items-center gap-4">
          <img src={banner.imageUrl} alt="" className="w-32 h-20 object-cover rounded" />
          <div className="flex-1">
            <div className="font-bold">{banner.title}</div>
            {banner.linkUrl && <a href={banner.linkUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">링크</a>}
          </div>
          <button onClick={() => { setSelectedBanner(banner); setIsModalOpen(true); }} className="btn font-bold text-blue-500">수정</button>
          <button onClick={() => deleteBanner(banner.id, banner.imageUrl)} className="btn font-bold text-red-500">삭제</button>
        </div>
      ))}
      {isModalOpen && (
        <BannerEditorModal
          banner={selectedBanner}
          onClose={() => {
            setSelectedBanner(null);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default ManageBannerPage;
