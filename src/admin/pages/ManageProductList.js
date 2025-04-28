// src/admin/pages/ManageProductsPage.js
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { ref, deleteObject } from 'firebase/storage';
import ProductEditorModal from '../components/ProductEditorModal';

//내추럴 우드 프레임 - 밝고 따뜻한 분위기를 만들어주는 자연스러운 우드 컬러의 프레임입니다.
//월넛 우드 프레임 - 고급스러운 짙은 톤의 프레임으로 차분하고 깊은 공간 연출이 가능합니다.


function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState('전체');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'homepage_products'), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    });
    return () => unsubscribe();
  }, []);



  const categories = ['전체', '본체', '프레임', '액세서리'];

  const deleteProduct = async (id, imageUrl) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await deleteDoc(doc(db, 'homepage_products', id));
      if (imageUrl) {
        await deleteObject(ref(storage, imageUrl));
      }
    }
  };

  const filteredProducts =
    filteredCategory === '전체'
      ? products
      : products.filter((item) => item.category === filteredCategory);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">제품 관리</h1>

      <div className="flex justify-between items-center mb-6">
        {/* 왼쪽: 카테고리 탭 */}
        <div className="flex gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilteredCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold ${
                filteredCategory === cat
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 오른쪽: 등록 버튼 */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded"
        >
          제품 등록
        </button>
      </div>


      <p className="text-gray-500 mb-4">
        카테고리는 하드코딩 되어있습니다. 필요시 코드 수정해주세요.
      </p>

      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 flex items-center gap-4">
          <img
            src={product.imageUrl}
            alt={product.productName}
            className="w-32 h-32 object-cover rounded"
          />
          <div className="flex-1">
            <div className="text-sm font-bold text-gray-600">[{product.category}]</div>
            <div className="mt-2 font-bold">{product.productName}</div>
            <div className="mt-2 text-sm text-gray-500">{product.description}</div>
          </div>
          <button
            onClick={() => {
              setSelectedProduct(product);
              setIsModalOpen(true);
            }}
            className="btn font-bold text-blue-500"
          >
            수정
          </button>
          <button
            onClick={() => deleteProduct(product.id, product.imageUrl)}
            className="btn font-bold text-red-500"
          >
            삭제
          </button>
        </div>
        
        ))}
      </div>

      {isModalOpen && (
        <ProductEditorModal
          product={selectedProduct}
          onClose={() => {
            setSelectedProduct(null);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default ManageProductsPage;
