/**
 * Insurance-related constants and types
 */

export interface Insurer {
  id: string;
  name: string;
  price: number;
  rating: number;
  badge: string | null;
  type: ('vat-chat' | 'bat-buoc')[];
  /** Logo initial for placeholder (e.g. "PVI", "BV") */
  logoInitial?: string;
}

/** Extended insurer for BOFU landing page - 11 partners with benefits */
export interface InsurerWithBenefits extends Insurer {
  fullName?: string;
  benefits: {
    thuyKich: boolean;
    matCap: boolean;
    suaChuaChinhHang: boolean;
  };
}

export interface CarCategory {
  id: string;
  name: string;
  price: number;
}

export const INSURERS: Insurer[] = [
  { id: 'pvi', name: 'Bảo hiểm PVI', price: 6500000, rating: 4.8, badge: 'Phổ biến nhất', type: ['vat-chat', 'bat-buoc'] },
  { id: 'baoviet', name: 'Bảo Việt', price: 7200000, rating: 4.9, badge: 'Uy tín nhất', type: ['vat-chat', 'bat-buoc'] },
  { id: 'mic', name: 'Bảo hiểm Quân Đội (MIC)', price: 5900000, rating: 4.5, badge: 'Giá tốt nhất', type: ['vat-chat'] },
  { id: 'vbi', name: 'Vietinbank (VBI)', price: 5800000, rating: 4.4, badge: null, type: ['vat-chat', 'bat-buoc'] },
];

/** 11 nhà bảo hiểm vật chất ô tô - Mock data cho landing BOFU */
export const INSURERS_VAT_CHAT: InsurerWithBenefits[] = [
  { id: 'pvi', name: 'PVI', fullName: 'Bảo hiểm PVI', price: 6500000, rating: 4.8, badge: 'Phổ biến nhất', type: ['vat-chat', 'bat-buoc'], logoInitial: 'PVI', benefits: { thuyKich: true, matCap: true, suaChuaChinhHang: true } },
  { id: 'liberty', name: 'Liberty', fullName: 'Liberty Insurance', price: 6200000, rating: 4.7, badge: null, type: ['vat-chat'], logoInitial: 'LB', benefits: { thuyKich: true, matCap: true, suaChuaChinhHang: true } },
  { id: 'baoviet', name: 'Bảo Việt', fullName: 'Tổng Công ty Bảo Việt', price: 7200000, rating: 4.9, badge: 'Uy tín', type: ['vat-chat', 'bat-buoc'], logoInitial: 'BV', benefits: { thuyKich: true, matCap: true, suaChuaChinhHang: true } },
  { id: 'mic', name: 'MIC', fullName: 'Bảo hiểm Quân Đội', price: 5900000, rating: 4.5, badge: 'Giá tốt', type: ['vat-chat'], logoInitial: 'MIC', benefits: { thuyKich: true, matCap: true, suaChuaChinhHang: false } },
  { id: 'vbi', name: 'VBI', fullName: 'Vietinbank Insurance', price: 5800000, rating: 4.4, badge: null, type: ['vat-chat', 'bat-buoc'], logoInitial: 'VBI', benefits: { thuyKich: true, matCap: false, suaChuaChinhHang: false } },
  { id: 'pti', name: 'PTI', fullName: 'P&T Insurance', price: 6100000, rating: 4.6, badge: null, type: ['vat-chat'], logoInitial: 'PTI', benefits: { thuyKich: true, matCap: true, suaChuaChinhHang: false } },
  { id: 'pjico', name: 'PJICO', fullName: 'Bảo hiểm PJICO', price: 5950000, rating: 4.5, badge: null, type: ['vat-chat'], logoInitial: 'PJ', benefits: { thuyKich: true, matCap: false, suaChuaChinhHang: true } },
  { id: 'baominh', name: 'Bảo Minh', fullName: 'Bảo Minh CMG', price: 6350000, rating: 4.6, badge: null, type: ['vat-chat'], logoInitial: 'BM', benefits: { thuyKich: true, matCap: true, suaChuaChinhHang: true } },
  { id: 'sjc', name: 'SJC', fullName: 'Bảo hiểm Bưu điện', price: 6050000, rating: 4.4, badge: null, type: ['vat-chat'], logoInitial: 'SJC', benefits: { thuyKich: true, matCap: false, suaChuaChinhHang: false } },
  { id: 'vinca', name: 'Vinacomin', fullName: 'Bảo hiểm Vinacomin', price: 5750000, rating: 4.3, badge: 'Giá rẻ', type: ['vat-chat'], logoInitial: 'VC', benefits: { thuyKich: true, matCap: false, suaChuaChinhHang: false } },
  { id: 'agribank', name: 'Agribank', fullName: 'Bảo hiểm Agribank', price: 5980000, rating: 4.5, badge: null, type: ['vat-chat'], logoInitial: 'AB', benefits: { thuyKich: true, matCap: true, suaChuaChinhHang: false } },
];

export const CAR_CATEGORIES: CarCategory[] = [
  { id: '4-5', name: 'Xe 4-5 chỗ (Không kinh doanh)', price: 437000 },
  { id: '6-11', name: 'Xe 6-11 chỗ (Không kinh doanh)', price: 794000 },
  { id: 'truck', name: 'Xe tải dưới 3 tấn', price: 853000 },
];

/** Car brands and their models for physical insurance flow */
export interface CarModel {
  id: string;
  name: string;
}

export interface CarBrand {
  id: string;
  name: string;
  models: CarModel[];
}

export const CAR_BRANDS: CarBrand[] = [
  { id: 'toyota', name: 'Toyota', models: [{ id: 'vios', name: 'Vios' }, { id: 'camry', name: 'Camry' }, { id: 'corolla-cross', name: 'Corolla Cross' }, { id: 'fortuner', name: 'Fortuner' }, { id: 'innova', name: 'Innova' }, { id: 'hilux', name: 'Hilux' }, { id: 'rush', name: 'Rush' }, { id: 'land-cruiser', name: 'Land Cruiser' }] },
  { id: 'honda', name: 'Honda', models: [{ id: 'city', name: 'City' }, { id: 'civic', name: 'Civic' }, { id: 'accord', name: 'Accord' }, { id: 'cr-v', name: 'CR-V' }, { id: 'hr-v', name: 'HR-V' }, { id: 'br-v', name: 'BR-V' }, { id: 'brio', name: 'Brio' }] },
  { id: 'vinfast', name: 'VinFast', models: [{ id: 'vf-8', name: 'VF 8' }, { id: 'vf-9', name: 'VF 9' }, { id: 'vf-e34', name: 'VF e34' }, { id: 'lux-a20', name: 'Lux A2.0' }, { id: 'lux-sa20', name: 'Lux SA2.0' }, { id: 'fadil', name: 'Fadil' }] },
  { id: 'mazda', name: 'Mazda', models: [{ id: 'mazda2', name: 'Mazda 2' }, { id: 'mazda3', name: 'Mazda 3' }, { id: 'mazda6', name: 'Mazda 6' }, { id: 'cx-5', name: 'CX-5' }, { id: 'cx-8', name: 'CX-8' }, { id: 'bt-50', name: 'BT-50' }] },
  { id: 'hyundai', name: 'Hyundai', models: [{ id: 'accent', name: 'Accent' }, { id: 'elantra', name: 'Elantra' }, { id: 'santa-fe', name: 'Santa Fe' }, { id: 'tucson', name: 'Tucson' }, { id: 'creta', name: 'Creta' }, { id: 'stargazer', name: 'Stargazer' }] },
  { id: 'kia', name: 'Kia', models: [{ id: 'k3', name: 'K3' }, { id: 'k5', name: 'K5' }, { id: 'seltos', name: 'Seltos' }, { id: 'sorento', name: 'Sorento' }, { id: 'sportage', name: 'Sportage' }, { id: 'cerato', name: 'Cerato' }] },
  { id: 'ford', name: 'Ford', models: [{ id: 'ranger', name: 'Ranger' }, { id: 'everest', name: 'Everest' }, { id: 'territory', name: 'Territory' }, { id: 'ecosport', name: 'EcoSport' }] },
  { id: 'mitsubishi', name: 'Mitsubishi', models: [{ id: 'xpander', name: 'Xpander' }, { id: 'xpander-cross', name: 'Xpander Cross' }, { id: 'pajero-sport', name: 'Pajero Sport' }, { id: 'triton', name: 'Triton' }] },
  { id: 'other', name: 'Hãng khác', models: [{ id: 'other', name: 'Khác' }] },
];
