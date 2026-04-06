export default function SubCategoryCreateCard({createSubCategory,categories,parentId,loading,setSubCategoryName}){
    return(
        <>
        <div className="p-5 grid grid-cols-1 border w-full rounded gap-5 bg-foreground text-background shadow-lg">
            <div>
                <h1 className="font-semibold ">Category Name : {categories?.name}</h1>
            </div>
            <div>
                <h1 className="font-semibold ">Category Id :  {categories?.id}</h1>
            </div>
            <form onSubmit={(e) => createSubCategory(e, categories?.id)} className="w-full flex flex-row gap-5 items-center">
  <input 
    type="text"
    placeholder="SubCategory Name"
    className="w-full p-2 border border-background rounded"
    onChange={(e) => setSubCategoryName(e.target.value)}
    required
  />

  <button
    type="submit"
    className={`rounded border cursor-pointer px-4 py-2 hover:bg-blue-600 ${parentId==categories?.id?" bg-background text-foreground cursor-not-allowed":""}`}
  >
  {parentId==categories?.id?"Creating...":  "Create"}
  </button>
</form>
            
            

        </div>

        </>
    )
}