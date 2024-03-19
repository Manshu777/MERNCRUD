import React,{useEffect,useState} from 'react';

const Products = () => {
    const [data, setdata] = useState([]);
 
    useEffect(() => {
        const proddata = async() =>{
            try {
                const response =  await fetch('http://localhost:9000');
                const data = await response.json();
                console.log(data);
                setdata(data);
              } catch (error) {
                console.error("Error fetching data: ", error);
              }
        }
        proddata()
  
    },[])

    return (
        <>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
  {data?.map((item, ind) => (
    <div key={ind} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="w-full h-56 bg-gray-200 flex justify-center items-center">
        <img className="object-cover h-full" src={`http://localhost:9000/uploads/${item.productImage}`} alt={item.name} />
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-lg text-gray-800">{item.name}</h4>
        <p className="text-gray-600">₹{item.price}</p>
      </div>
    </div>
  ))}
</div>


        </>
    )
}


export default Products;