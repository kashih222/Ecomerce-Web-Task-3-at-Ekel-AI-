import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

type ProductFormInputs = {
  name: string;
  category: string;
  price: number;
  rating: number;
  description: string;
  shortDescription: string;
  images: {
    thumbnail: string;
    gallery: string[];
    detailImage: string;
  };
  specifications: {
    material: string;
    height: string;
    width: string;
    weight: string;
    color: string;
  };
  availability: string;
};

const API_ADD_PRODUCT = "http://localhost:5000/api/products/add";

const AddProductPage = () => {
  const { register, handleSubmit, control, reset } = useForm<ProductFormInputs>({
    defaultValues: {
      images: { gallery: [""] },
      specifications: { material: "", height: "", width: "", weight: "", color: "" },
    },
  });

  const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
    try {
      const token = localStorage.getItem("token") || "";

      const response = await axios.post(API_ADD_PRODUCT, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product added successfully!");
      reset();
      console.log("Added product:", response.data);
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = axios.isAxiosError(err) 
        ? err.response?.data?.message || "Failed to add product"
        : "Failed to add product";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-5xl  p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Name & Category */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Product Name"
            {...register("name", { required: true })}
            className="flex-1 border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            placeholder="Category"
            {...register("category", { required: true })}
            className="flex-1 border border-gray-300 rounded p-2"
          />
        </div>

        {/* Price & Rating */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="number"
            placeholder="Price"
            step="0.01"
            {...register("price", { required: true, min: 0 })}
            className="flex-1 border border-gray-300 rounded p-2"
          />
          <input
            type="number"
            placeholder="Rating"
            step="0.1"
            min={0}
            max={5}
            {...register("rating", { required: true, min: 0, max: 5 })}
            className="flex-1 border border-gray-300 rounded p-2"
          />
        </div>

        {/* Description */}
        <textarea
          placeholder="Full Description"
          {...register("description", { required: true })}
          className="w-full border border-gray-300 rounded p-2"
        />
        <textarea
          placeholder="Short Description"
          {...register("shortDescription")}
          className="w-full border border-gray-300 rounded p-2"
        />

        {/* Images */}
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Thumbnail URL"
            {...register("images.thumbnail")}
            className="w-full border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            placeholder="Detail Image URL"
            {...register("images.detailImage")}
            className="w-full border border-gray-300 rounded p-2"
          />
          <Controller
            control={control}
            name="images.gallery"
            render={({ field }) => (
              <>
                {field.value.map((url, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-2 mb-2">
                    <input
                      type="text"
                      placeholder={`Gallery Image ${index + 1}`}
                      value={url}
                      onChange={(e) => {
                        const newGallery = [...field.value];
                        newGallery[index] = e.target.value;
                        field.onChange(newGallery);
                      }}
                      className="flex-1 border border-gray-300 rounded p-2"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newGallery = field.value.filter((_, i) => i !== index);
                        field.onChange(newGallery);
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => field.onChange([...field.value, ""])}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Add Gallery Image
                </button>
              </>
            )}
          />
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Material"
            {...register("specifications.material")}
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            placeholder="Height"
            {...register("specifications.height")}
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            placeholder="Width"
            {...register("specifications.width")}
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            placeholder="Weight"
            {...register("specifications.weight")}
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            placeholder="Color"
            {...register("specifications.color")}
            className="border border-gray-300 rounded p-2"
          />
        </div>

        {/* Availability */}
        <select
          {...register("availability")}
          className="border border-gray-300 rounded p-2 w-full"
        >
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
