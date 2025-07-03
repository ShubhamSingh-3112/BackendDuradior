const Items = require('../collections/itemsCollection');

const browseProducts = async(req,res) =>{
    try
    {
        const{category,minPrice,maxPrice,search,sort,inStock}=req.query;// taking filter parameters from the query in the request url
        let filter = {};//filter empty at first
        if (category) { //filter by category
            filter.category = category;
        }
        if (minPrice||maxPrice) {//by price range
            filter.cost = {};
            if (minPrice) filter.cost.$gte = Number(minPrice);
            if (maxPrice) filter.cost.$lte = Number(maxPrice);
        }
        if (search) { //by searching the itemName
            filter.itemName = { $regex: search, $options: 'i' };// options for case insensitivity
        }
        if (inStock==='true') { //for checking stock
            filter.quantity = { $gt:0 };
        }
        let sortOption = {};
        if (sort==='price_asc') sortOption.cost = 1;//ascending order
        else if (sort==='price_desc') sortOption.cost = -1;//descending order
        const products = await Items.find(filter).sort(sortOption);
        res.status(200).json({success:true,data:products});
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
module.exports = browseProducts;