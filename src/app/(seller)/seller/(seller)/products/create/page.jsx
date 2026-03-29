export default function page(){
    return (
        <>
        <div className="grid grid-cols-1 place-items-center p-5 gap-5">
            <div  className="w-full " >
            <h1 className="text-3xl font-bold">Create Product</h1>
            </div>

            <div  className="w-full p-5 " >
            <form className="grid grid-cols-1 gap-5 w-full  border rounded p-5">
                <input type="text" placeholder="Product Name" className="border border-gray-300 p-3 rounded"/>
                <textarea placeholder="Product Description" className="border border-gray-300 p-3 rounded"></textarea>
                <input type="number" placeholder="Price" className="border border-gray-300 p-3 rounded"/>
                <input type="file" className="border border-gray-300 p-3 rounded"/>
                <button type="submit" className="bg-yellow-500 text-white p-3 rounded font-bold">Create Product</button>
            </form>
            </div>
            </div>

        
        </>
    )
}