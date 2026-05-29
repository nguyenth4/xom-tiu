import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Products.module.css';
import { api } from '../../../services/api';

export interface ProductFormData {
  id?: number;
  name: string;
  price: string;
  category: string; // This holds categoryId
  stock: number;
  status: 'Còn hàng' | 'Hết hàng';
  image: string;
  shortDescription: string;
  description: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: (shouldRefresh?: boolean) => void;
  product?: ProductFormData | null;
  categories: any[];
}

const ProductModal = ({ isOpen, onClose, product, categories }: ProductModalProps) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '', price: '', category: '', stock: 0, status: 'Còn hàng', image: '', shortDescription: '', description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({ name: '', price: '', category: '', stock: 0, status: 'Còn hàng', image: '', shortDescription: '', description: '' });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;
  const isEditMode = !!product;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      price: Number(formData.price.toString().replace(/\D/g, '')), // Remove non-digits
      categoryId: Number(formData.category),
      stock: Number(formData.stock),
      status: formData.status,
      image: formData.image,
      shortDescription: formData.shortDescription,
      description: formData.description
    };

    try {
      if (isEditMode && product?.id) {
        await api.patch(`/products/${product.id}`, payload);
      } else {
        await api.post('/products', payload);
      }
      onClose(true); // Close and refresh
    } catch (error) {
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={() => onClose(false)}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{isEditMode ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
          <button className={styles.closeBtn} onClick={() => onClose(false)}>
            <X size={24} />
          </button>
        </div>

        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Tên sản phẩm</label>
            <input 
              type="text" 
              name="name"
              className="input-field" 
              value={formData.name} 
              onChange={handleChange}
              placeholder="VD: Hủ Tiếu Nam Vang" 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={styles.formGroup}>
              <label>Danh mục</label>
              <select name="category" className="input-field" value={formData.category} onChange={handleChange} required>
                <option value="">Chọn danh mục</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Giá bán (VNĐ)</label>
              <input 
                type="text" 
                name="price"
                className="input-field" 
                value={formData.price} 
                onChange={handleChange}
                placeholder="VD: 65000" 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={styles.formGroup}>
              <label>Tồn kho</label>
              <input 
                type="number" 
                name="stock"
                className="input-field" 
                value={formData.stock} 
                onChange={handleChange}
                min="0" 
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Trạng thái</label>
              <select name="status" className="input-field" value={formData.status} onChange={handleChange}>
                <option value="Còn hàng">Còn hàng</option>
                <option value="Hết hàng">Hết hàng</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Hình ảnh sản phẩm</label>
            <input 
              type="file" 
              name="imageFile"
              className="input-field" 
              accept="image/*"
              onChange={async (e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  const uploadData = new FormData();
                  uploadData.append('file', file);
                  
                  try {
                    const response = await api.post('/upload', uploadData);
                    setFormData(prev => ({ ...prev, image: response.url }));
                  } catch (error) {
                    alert('Lỗi tải ảnh lên. Vui lòng thử lại.');
                  }
                }
              }}
            />
            <input 
              type="hidden" 
              name="image"
              value={formData.image} 
            />
            {formData.image && (
              <div className={styles.imagePreview}>
                <img src={formData.image} alt="Preview" />
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Mô tả ngắn</label>
            <textarea 
              name="shortDescription"
              className="input-field" 
              value={formData.shortDescription} 
              onChange={e => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
              placeholder="Nhập mô tả ngắn gọn..."
              rows={2}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Mô tả chi tiết</label>
            <textarea 
              name="description"
              className="input-field" 
              value={formData.description} 
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Nhập mô tả chi tiết sản phẩm..."
              rows={4}
            />
          </div>

          <div className={styles.modalActions}>
            <button type="button" className="btn btn-ghost" onClick={() => onClose(false)} disabled={isSubmitting}>Hủy bỏ</button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Đang lưu...' : (isEditMode ? 'Lưu thay đổi' : 'Thêm sản phẩm')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
