import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import styles from './Categories.module.css';
import CategoryModal from './CategoryModal';

export interface Category {
  id: number;
  name: string;
  _count?: {
    products: number;
  };
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
    } else {
      setEditingCategory(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSaveSuccess = () => {
    fetchCategories();
    handleCloseModal();
  };

  const handleDelete = async (category: Category) => {
    if (category._count && category._count.products > 0) {
      alert(`Không thể xóa danh mục "${category.name}" vì vẫn còn sản phẩm thuộc danh mục này.`);
      return;
    }

    if (window.confirm(`Bạn có chắc chắn muốn xóa danh mục "${category.name}" không?`)) {
      try {
        const response = await fetch(`http://localhost:3000/api/categories/${category.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchCategories();
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Có lỗi xảy ra khi xóa danh mục');
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Có lỗi xảy ra khi xóa danh mục');
      }
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.categoriesPage}>
      <div className={styles.pageHeader}>
        <h1>Quản lý Danh mục</h1>
        <div className={styles.actions}>
          <div className={styles.searchBar}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            <Plus size={18} />
            Thêm danh mục
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Đang tải dữ liệu...</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên danh mục</th>
                <th>Số sản phẩm</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <tr key={category.id}>
                    <td>#{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category._count?.products || 0}</td>
                    <td>
                      <div className={styles.actionButtons}>
                        <button
                          className={styles.editBtn}
                          onClick={() => handleOpenModal(category)}
                          title="Chỉnh sửa"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(category)}
                          title="Xóa"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>
                    Không tìm thấy danh mục nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <CategoryModal
          category={editingCategory}
          onClose={handleCloseModal}
          onSuccess={handleSaveSuccess}
        />
      )}
    </div>
  );
};

export default Categories;
