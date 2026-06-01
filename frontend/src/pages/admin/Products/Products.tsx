import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Filter } from 'lucide-react';
import ProductModal, { type ProductFormData } from './ProductModal';
import styles from './Products.module.css';
import { api } from '../../../services/api';

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductFormData | null>(null);
  
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState('STAFF');

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUserRole(JSON.parse(userStr).role);
      } catch (e) {}
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [prodsRes, catsRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories')
      ]);
      setProducts(prodsRes);
      setCategories(catsRes);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (product?: any) => {
    if (product) {
      // Map API product to ProductFormData
      setEditingProduct({
        id: product.id,
        name: product.name,
        price: product.price.toString(),
        category: product.categoryId.toString(), // Map categoryId to string for select
        stock: product.stock,
        status: product.status,
        image: product.image || '',
        shortDescription: product.shortDescription || '',
        description: product.description || '',
        variants: product.variants || []
      });
    } else {
      setEditingProduct(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = (shouldRefresh = false) => {
    setIsModalOpen(false);
    setEditingProduct(null);
    if (shouldRefresh) {
      fetchData();
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchData();
      } catch (error) {
        alert('Có lỗi xảy ra khi xóa');
      }
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.categoryId?.toString() === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`animate-fade-in ${styles.adminProductsPage}`}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Quản lý sản phẩm</h1>
          <p className="text-muted">Quản lý danh sách món ăn, giá cả và tồn kho.</p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={20} /> Thêm sản phẩm mới
        </button>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBar}>
          <Search size={20} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Tìm kiếm sản phẩm..." 
            className="input-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={20} className="text-muted" />
          <select 
            className="input-field" 
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            style={{ width: '200px' }}
          >
            <option value="">Tất cả danh mục</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá bán</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
              <th className="text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={6} className="text-center" style={{ padding: '3rem' }}>Đang tải dữ liệu...</td></tr>
            ) : filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className={styles.productCell}>
                    <img src={product.image || 'https://via.placeholder.com/60'} alt={product.name} className={styles.productThumb} />
                    <span className={styles.productName}>{product.name}</span>
                  </div>
                </td>
                <td>{product.category?.name}</td>
                <td className="font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={`${styles.statusBadge} ${product.status === 'Còn hàng' ? styles.statusInStock : styles.statusOutOfStock}`}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <button className={styles.actionBtnEdit} onClick={() => handleOpenModal(product)} title="Chỉnh sửa">
                      <Edit2 size={18} />
                    </button>
                    {userRole === 'ADMIN' && (
                      <button className={styles.actionBtnDelete} onClick={() => handleDelete(product.id)} title="Xóa">
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {!isLoading && filteredProducts.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center" style={{ padding: '3rem' }}>
                  Không tìm thấy sản phẩm nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        product={editingProduct} 
        categories={categories}
      />
    </div>
  );
};

export default AdminProducts;
