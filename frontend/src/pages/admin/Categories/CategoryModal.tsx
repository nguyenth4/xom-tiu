import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import styles from './Categories.module.css';
import type { Category } from './Categories';

interface CategoryModalProps {
  category: Category | null;
  onClose: () => void;
  onSuccess: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ category, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Tên danh mục không được để trống');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const url = category 
        ? `http://localhost:3000/api/categories/${category.id}`
        : 'http://localhost:3000/api/categories';
      
      const method = category ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Backend validation errors (e.g. duplicate name)
        if (Array.isArray(data.message)) {
          setError(data.message[0]);
        } else {
          setError(data.message || 'Có lỗi xảy ra');
        }
        return;
      }

      onSuccess();
    } catch (err) {
      console.error('Error saving category:', err);
      setError('Lỗi kết nối đến máy chủ');
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalContent = (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{category ? 'Chỉnh sửa Danh mục' : 'Thêm Danh mục mới'}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.formGroup}>
              <label htmlFor="categoryName">Tên danh mục <span style={{color: 'red'}}>*</span></label>
              <input
                type="text"
                id="categoryName"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Nhập tên danh mục..."
                autoFocus
              />
              {error && <span className={styles.errorText}>{error}</span>}
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || !name.trim()}
            >
              {isSubmitting ? 'Đang lưu...' : 'Lưu lại'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default CategoryModal;
