import { useState } from "react";
import ProductsData from "./ProductsData.json";
import Category from "./Category/Category";

interface Product {
  id: string;
  name: string;
  price: number;
  images: ProductImages;
  rating: number;
  category: string;
  description?: string;
  shortDescription: string;
  reviews: iReview[];
  specifications: iSpecifications;
  availability: string;
}

interface ProductImages {
  thumbnail: string;
  gallery: string[];
  detailImages: string;
}
interface iReview {
  user: string;
  comment: string;
  rating: number;
}
interface iSpecifications {
  
    color: string;
    height: string;
    weight: string;
    material: string;
    width: string;
  
};

const StarRating: React.FC<{ rating: number; maxRating?: number }> = ({
  rating,
  maxRating = 5,
}) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center mt-2">
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-400 text-lg">
          ★
        </span>
      ))}
      {halfStar && <span className="text-yellow-400 text-lg">☆</span>}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300 text-lg">
          ★
        </span>
      ))}
      <span className="ml-2 text-gray-600 text-sm">({rating})</span>
    </div>
  );
};

if (!ProductsData || ProductsData.length === 0) {
  throw new Error("Products data is missing or empty.");
}
const ProductPage = () => {
  const [products] = useState<Product[] | null>(ProductsData as unknown as Product[]);
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  
  const handleViewClick = ( productId: Product) => {
    setSelectedProduct(productId);
      setSelectedImage(productId.images.detailImages);
    setOpenViewModal(true);

  };
  return (
      <div className="w-full min-h-screen bg-gray-100 mt-20">
      <Category />

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products?.map((product) => (
            <div
              key={product.id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <figure className="w-full h-64 overflow-hidden rounded-lg">
                <img
                  src={product.images.thumbnail}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-all duration-500"
                />
              </figure>

              <h2 className="mt-4 font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-700 mt-2">{product.shortDescription}</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {product.category && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                )}
                {product.availability && (
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      product.availability.toLowerCase() === "in stock"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.availability}
                  </span>
                )}
              </div>

              <p className="text-gray-700 font-bold mt-2">{product.price}$</p>

              {product.rating && <StarRating rating={product.rating} />}

              <div className="flex gap-2 mt-4">
                <button
                  className="w-full py-2 outline-1 text-black rounded-lg hover:scale-90 transition"
                  onClick={() => handleViewClick(product)}
                >
                  View
                </button>
                <button className="w-full py-2 bg-gray-900 text-white rounded-lg hover:scale-90 hover:bg-gray-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {openViewModal && selectedProduct && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto p-4 pt-[450px] md:pt-4 ">
            <div className="bg-white rounded-xl w-full max-w-4xl p-6 relative shadow-lg">
              <button
                onClick={() => setOpenViewModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl font-bold"
              >
                ✕
              </button>

              {/* Product Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Images */}
                <div>
                  <figure className="mb-4">
                    <img
                      src={selectedImage || selectedProduct.images.detailImages}
                      alt={selectedProduct.name}
                      className="w-full h-76 object-cover rounded-lg shadow-md"
                    />
                  </figure>
                  <div className="flex gap-2">
                    {[selectedProduct.images.detailImages, ...selectedProduct.images.gallery]
                      .filter((img): img is string => !!img)
                      .map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`${selectedProduct.name}-${index}`}
                          className="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-gray-200 hover:border-gray-900"
                          onClick={() => setSelectedImage(img)}
                        />
                      ))}
                  </div>
                   <div className="mt-4">
                    <h3 className="font-semibold mb-2">Reviews:</h3>
                    <div className="flex  gap-2 max-h-48 overflow-y-auto">
                      {selectedProduct.reviews.map((review, idx) => (
                        <div key={idx} className="border-b border-gray-200 pb-2">
                          <p className="font-medium">{review.user}</p>
                          <p className="text-yellow-400">
                            {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                          </p>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Details */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-bold">{selectedProduct.name}</h2>
                  <p className="text-gray-600">{selectedProduct.category}</p>
                  <p className="text-xl font-semibold">${selectedProduct.price}</p>

                  <div className="flex items-center gap-2">
                    <span className="font-medium">{selectedProduct.rating} / 5</span>
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.round(selectedProduct.rating) ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.376 2.454a1 1 0 00-.364 1.118l1.287 3.965c.3.921-.755 1.688-1.54 1.118l-3.376-2.454a1 1 0 00-1.176 0l-3.376 2.454c-.784.57-1.838-.197-1.539-1.118l1.286-3.965a1 1 0 00-.364-1.118L2.049 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600">{selectedProduct.description}</p>

                  <p
                    className={`font-medium ${
                      selectedProduct.availability.toLowerCase() === "in stock"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedProduct.availability}
                  </p>

                  <div className="mt-2">
                    <h3 className="font-semibold mb-2">Specifications:</h3>
                    <ul className="text-gray-700">
                      {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                        <li key={key}>
                          <span className="font-medium capitalize">{key}:</span> {value}
                        </li>
                      ))}
                    </ul>
                  </div>

                 

                  <button className="mt-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition">
                    Add to Cart
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
