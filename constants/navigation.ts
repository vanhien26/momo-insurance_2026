export const PRODUCT_NAVIGATION = {
  // Menu cho trang tổng
  "/bao-hiem": [
    {
      label: "Bảo hiểm Ô tô",
      href: "/bao-hiem-o-to",
      children: [
        { label: "Bảo hiểm Vật chất", href: "/bao-hiem-o-to/vat-chat" },
        { label: "Bảo hiểm TNDS", href: "/bao-hiem-o-to/tnds" },
      ],
    },
    { label: "Bảo hiểm Xe máy", href: "/bao-hiem-xe-may" },
    { label: "Bảo hiểm Sức khỏe", href: "/bao-hiem-suc-khoe" },
    { label: "Bảo hiểm Y tế", href: "/bao-hiem-y-te" },
  ],
  // Menu riêng cho Bảo hiểm Ô tô
  "/bao-hiem-o-to": [
    { label: "Vật chất", href: "/bao-hiem-o-to/vat-chat" },
    { label: "TNDS", href: "/bao-hiem-o-to/tnds" },
    { label: "Blog", href: "/bao-hiem-o-to/blog" },
    {
      label: "Hãng xe",
      href: "#",
      children: [
        { label: "Toyota", href: "/bao-hiem-o-to/toyota" },
        { label: "Honda", href: "/bao-hiem-o-to/honda" },
        { label: "Hyundai", href: "/bao-hiem-o-to/hyundai" },
      ],
    },
    {
      label: "Đối tác",
      href: "#",
      children: [
        { label: "Bảo Việt", href: "/bao-hiem-o-to/doi-tac/bao-viet" },
        { label: "PVI", href: "/bao-hiem-o-to/doi-tac/pvi" },
        { label: "Liberty", href: "/bao-hiem-o-to/doi-tac/liberty" },
      ],
    },
  ],
};