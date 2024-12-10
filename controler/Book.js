


import Book from "./Bookscema.js";

export const getBook = async(req, res) => {
    try {
        const book = await Book.find();
        res.status(200).json({msg:book});
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};


export const singeledata=async(req,res)=>{

    try {
        const { id } = req.params;
    
        const datasingale=await Book.findById(id)

        if(!datasingale){
            console.log("not found")
            return res.status(400).json({msg:"no found data"})
        }
      
        res.status(200).json({msg:datasingale});
    } catch (error) {
        console.log(error)
    }


}





