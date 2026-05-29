import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Minus, Plus } from 'lucide-react';
import styles from './ProductDetail.module.css';

// Mock product fetching
const getProductById = (id: string | undefined) => {
  const products = [
    {
      id: '1',
      name: 'Hủ Tiếu Tươi',
      price: '65,000đ',
      image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cb438?q=80&w=1200&auto=format&fit=crop',
      tag: 'Bán chạy',
      description: 'Hủ tiếu tươi với nước lèo thanh ngọt hầm xương 12 tiếng, kèm thịt băm, tôm tươi, trứng cút và rau sống chuẩn vị.',
    },
    {
      id: '2',
      name: 'Hủ Tiếu Khô',
      price: '65,000đ',
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1200&auto=format&fit=crop',
      description: 'Hủ tiếu khô trộn với nước xốt gia truyền đậm đà, ăn kèm một chén nước súp xương ngọt thanh.',
    },
    {
      id: '3',
      name: 'Combo Tươi & Khô',
      price: '120,000đ',
      image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b485d?q=80&w=1200&auto=format&fit=crop',
      tag: 'Tiết kiệm',
      description: 'Trải nghiệm trọn vẹn hai hương vị đỉnh cao của Xóm Tíu. Bao gồm 1 phần Hủ Tiếu Tươi và 1 phần Hủ Tiếu Khô.',
    }
  ];

  const product = products.find(p => p.id === id) || products[0];

  return {
    ...product,
    toppings: [
      { id: 't1', name: 'Thêm tôm (2 con)', price: '15,000đ' },
      { id: 't2', name: 'Thêm trứng cút (3 quả)', price: '10,000đ' },
      { id: 't3', name: 'Thêm xí quách', price: '25,000đ' },
      { id: 't4', name: 'Thêm tóp mỡ', price: '5,000đ' },
    ]
  };
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  const handleToppingToggle = (toppingId: string) => {
    setSelectedToppings(prev => 
      prev.includes(toppingId) 
        ? prev.filter(t => t !== toppingId)
        : [...prev, toppingId]
    );
  };

  const handleDecrease = () => setQuantity(q => Math.max(1, q - 1));
  const handleIncrease = () => setQuantity(q => q + 1);

  return (
    <div className="container animate-fade-in">
      <Link to="/menu" className={styles.backLink}>
        <ArrowLeft size={20} /> Trở về Thực Đơn
      </Link>

      <div className={styles.productDetail}>
        <div className={styles.imageSection}>
          {product.tag && <span className={styles.tag}>{product.tag}</span>}
          <img src={product.image} alt={product.name} className={styles.image} />
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.price}>{product.price}</div>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.optionsSection}>
            <h3 className={styles.optionsTitle}>Tùy chọn thêm (Toppings)</h3>
            <div className={styles.optionsGrid}>
              {product.toppings.map(topping => (
                <label key={topping.id} className={styles.optionLabel}>
                  <input 
                    type="checkbox" 
                    checked={selectedToppings.includes(topping.id)}
                    onChange={() => handleToppingToggle(topping.id)}
                  />
                  <span className={styles.optionText}>{topping.name}</span>
                  <span className={styles.optionPrice}>+{topping.price}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <div className={styles.quantityCtrl}>
              <button className={styles.qtyBtn} onClick={handleDecrease}>
                <Minus size={20} />
              </button>
              <div className={styles.qtyValue}>{quantity}</div>
              <button className={styles.qtyBtn} onClick={handleIncrease}>
                <Plus size={20} />
              </button>
            </div>
            <button className={`btn btn-primary ${styles.addToCartBtn}`}>
              <ShoppingCart size={20} /> Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
