"use client"
import { useEffect, useState } from "react";
import { getElementById, updateElementById } from "@/app/acciones/search";
import { useRouter } from 'next/navigation';


const Edit = ({ params }: any) => {

  const [imageIndex, setImageIndex] = useState(0)
    const images = [
        {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
        },
        {
            original: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/250/150/",
        },
        {
            original: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/250/150/",
        },
    ];

  const router = useRouter();

  const [product, setProducts] = useState<any>([]);
  const [productId, setProductId] = useState<number>(params.id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [productData, setProductData] = useState({
    name: "",
    year: "",
    description: "",
    typeTank: "",
    image: "",
    gallery: [] as { original: string, thumbnail: string }[]
    
  });
  const [darkMode, setDarkMode] = useState(false); 


  const toggleDarkMode = () => {
    setDarkMode(!darkMode); 
  };

  const nextItem = () => {
    if (imageIndex >= images.length - 1) {
        setImageIndex(0);
    } else {
        setImageIndex((prevState) => prevState + 1);
    }
};

const prevItem = () => {
    if (imageIndex <= 0) {
        setImageIndex(images.length - 1);
    } else {
        setImageIndex((prevState) => prevState - 1);
    }
};

  useEffect(() => {
    const getData = async () => {
      setProductId(params.id)

      const dataResult = await getElementById(params.id);

      setProducts(dataResult || []);
      if (dataResult && dataResult.length > 0) {
        const { name, year, description, typeTank, image, gallery} = dataResult[0];
        setProductData({ name, year, description, typeTank, image, gallery});
      }
    };
    getData();
  }, [params.id]);


  return (
    <div className={`flex justify-center content-center items-center flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-white size-full' : 'bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% size-full'}`}>
        {product.map((item: any, index: number) => (
            <div
                className={`rounded-lg text-black mt-6 p-4 flex content-center justify-center max-w-lg w-full mx-auto ${darkMode ? 'bg-slate-700 text-white' : 'bg-white text-black'}`}
                key={index}
            >
                <form
                    className="flex flex-col gap-2 p-1 "
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <p className="text-center text-2xl font-semibold mb-2.5">ID:{params.id}</p>
                    <p className="text-center text-2xl font-semibold">{productData.name}</p>

                    <div className="w-auto flex items-center justify-center flex-col mt-2">
                        <img className="object-cover" src={productData.gallery[imageIndex]?.original} alt={`Image of ${productData.name}`}/>
                        <div className="flex items-center justify-center mt-2">
                            {productData.gallery.map((image: any, index: number) => (
                                <img
                                    className="object-cover w-12 h-12 mr-2 cursor-pointer"
                                    key={index}
                                    src={image.thumbnail} 
                                    alt={`Image of  ${productData.name}`}
                                />
                            ))}
                        </div>
                        <div className="flex items-center justify-center mt-2">
                            <button className="text-4xl font-bold" onClick={() => prevItem()}> {"<- "} </button>
                            <button className="text-4xl font-bold" onClick={() => nextItem()}>{" ->"}</button>
                        </div>
                    </div>
                    <p className="text-center text-2xl text-xl mb-2.5">{productData.typeTank}</p>
                    <p className="text-center text-2xl text-xl mb-2.5">Año: {productData.year}</p>
                    <p className="text-center text-base font-light">{productData.description}</p>
                </form>
            </div>
        ))}

        <button onClick={toggleDarkMode} className={`px-4 py-2 rounded-md mt-8  ${darkMode ? 'bg-yellow-300 text-black font-bold' : 'bg-purple-900 text-white font-bold'} hover:bg-gray-300 hover:text-white transition`}>
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </button>
    </div>
);
};

export default Edit;
