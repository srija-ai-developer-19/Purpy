import { useState, useEffect } from "react";
import { purpyGo } from "../App.jsx";

const ALL_DATA = {
  grocery: {
    carousel: [
      { img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUnElcmlRSLuI9BBc0VVmefbWRXfn9c2yg1TIcsyDQFQ&s=10", text:"Grocery Fresh 40% OFF" },
      { img:"https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=1200&q=80&auto=format&fit=crop", text:"Dairy Fresh - JioMart" },
      { img:"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&q=80&auto=format&fit=crop", text:"Veggies Fresh Daily" },
      { img:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200&q=80&auto=format&fit=crop", text:"Rice & Grains 20% OFF" },
      { img:"https://static.vecteezy.com/system/resources/thumbnails/070/868/141/small/fresh-fruits-display-variety-produce-harvest-market-free-photo.jpg", text:"Fruits Fresh Seasonal" },
    ],
    icons: [
      { id:"dairy", label:"Dairy", emoji:"🥛", img:"https://img.magnific.com/free-photo/dairy-products_114579-8756.jpg?semt=ais_hybrid&w=740&q=80" },
      { id:"veggies", label:"Veggies", emoji:"🥦", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnjV8GwJG6_QGVCUJYmfONe2LVj3_W6bjkW2SeZUKlCjza0gVDyjrldac&s=10" },
      { id:"fruits", label:"Fruits", emoji:"🍎", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZVkX4ZDS2pe9wzrTKERJdPRtpCrsQdgFlaZOTPxmOO6hI2hjid6FvW8Yl&s=10" },
      { id:"grains", label:"Rice & Dal", emoji:"🌾", img:"https://t3.ftcdn.net/jpg/02/14/14/76/360_F_214147625_X0kH4gFy8u7jpeBiMMvF7k8LYxG72R5Q.jpg" },
      { id:"oil", label:"Oil", emoji:"🫗", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrkR7h6ydSqyowq8DKP7pHcRaWYOyDUOL-3sLXcK8faNZtSvdM-rJ9pPkn&s=10" },
      { id:"masala", label:"Masala", emoji:"🧂", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7K1MJ1mWu-B0q2-s-_35bHN6fVOzgsPsP7dJ3LnrSDw&s=10" },
      { id:"beverages", label:"Beverages", emoji:"🧃", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJGIKbXwwd_b6vJISNf9eQoinBFkYL7e-6eqmIO2yHCtq0KlfzQnU-pt8f&s=10" },
      { id:"biscuits", label:"Biscuits", emoji:"🍪", img:"https://i.ytimg.com/vi/SqU_IOsgutI/hqdefault.jpg" },
      { id:"icecream", label:"Ice Creams", emoji:"🍦", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO4sGKouEU-pjMELMRQWrx4nIiAYA51mNguE58iJcgUXHKNSxQJ09PLe4&s=10" },
      { id:"bakery", label:"Bakery", emoji:"🍞", img:"https://www.netcostmarket.com/wp-content/uploads/2018/02/fresh-baked-breads-Optimised-image.jpg" },
      { id:"meat", label:"Meat & Eggs", emoji:"🍗", img:"https://media.istockphoto.com/id/450056783/photo/butchers-counter.jpg?s=612x612&w=0&k=20&c=ON3256z1TIGXqib7w6PNQcpb7_iBnUmSQkURjsmsdtc=" },
      { id:"chocolates", label:"Chocolates", emoji:"🍫", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuIsMQDX2Kv3tuo66n2U6ICMvRalh3YLWWG4hjmXphJqk-I8iYaAnvAF_&s=10" },
      { id:"snacks", label:"Snacks", emoji:"🍿", img:"https://www.shutterstock.com/image-photo/florida-june-24-2024-wide-600w-2486835177.jpg" },
    ],
  },
  clothes: {
    carousel: [
      { img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJaaWwWpKZfYHfhKjPsnImSXXYxQFFlgUwsaw-oxuV8D7itlxgOBWPd_lh&s=10", text:"Clothes 50% OFF - Amazon" },
      { img:"https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=80&auto=format&fit=crop", text:"Saree Collection - Flipkart" },
      { img:"https://www.beyours.in/cdn/shop/files/german-grey-flatlay_641f194d-f95a-45b1-9d01-58c70d506a38.jpg?v=1789546019", text:"Men Shirts - Peter England" },
      { img:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80&auto=format&fit=crop", text:"Men Jeans - Levis" },
      { img:"https://2.imimg.com/data2/BO/QF/MY-5317992/ladies-top.jpg", text:"Women Fashion" },
    ],
    icons: [
      { id:"men-shirts", label:"Men Shirts", emoji:"👔", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7WOzs7ZBF7zMXVfHBobTMyrZsKkaXoKM7X7ccqVsGshTKPTqByH88lB4&s=10" },
      { id:"men-jeans", label:"Men Jeans", emoji:"👖", img:"https://m.media-amazon.com/images/I/51jQjPdhWKL._AC_UY1100_.jpg" },
      { id:"men-tshirts", label:"T-Shirts", emoji:"👕", img:"https://5.imimg.com/data5/ANDROID/Default/2021/9/TF/TX/MC/115472531/ms-f9486-512-8458933-96096b5e010a1-l-jpg-500x500.jpg" },
      { id:"men-kurtas", label:"Men Kurtas", emoji:"👘", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM8ntuhivZpWk0ykmS6Dse14sK41dk2lQa_texLYv9Gw&s" },
      { id:"men-jackets", label:"Jackets", emoji:"🧥", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoauqukOkpNorC5-eCnPgkDUjhOg3UsUT8QaSIG79tath7XmqEYKzYlZhv&s=10" },
      { id:"women-saree", label:"Sarees", emoji:"🥻", img:"https://stilento.com/cdn/shop/products/designer-dark-blue-pure-cotton-printed-indian-women-sarees-stilento.jpg?v=16627" },
      { id:"women-kurti", label:"Kurtis", emoji:"👗", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnrgILin7G3n0C8zLgxCEisBVKTru50THEDDJYM46iIkujvvF9DUySj9yT&s=10" },
      { id:"women-jeans", label:"Women Jeans", emoji:"👖", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSointCbuEovGpdQXCR6isCyetpZvRUVcWc3rxRCRTpndrHNVHEGqMBOolx&s=10" },
      { id:"women-tops", label:"Tops", emoji:"👚", img:"https://tiimg.tistatic.com/fp/2/009/842/women-tops-293.jpg" },
      { id:"women-lehenga", label:"Lehenga", emoji:"👘", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoefAtBkamvV-J3qiPc1iYfEuQPiTMdDDaBOtR8M-TkR6aOWiiDLCKOk8&s=10" },
      { id:"kids-boys", label:"Kids Boys", emoji:"👦", img:"https://images.meesho.com/images/products/571247667/hlnhq_512.avif?width=512" },
      { id:"kids-girls", label:"Kids Girls", emoji:"👧", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsWGVehUxEvv8vTHSCCi52Hygy6ChaE0skWtdjnSnW-pdC7pnFop7uPmIA&s=10" },
    ],
  },
  beauty: {
    carousel: [
      { img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80&auto=format&fit=crop", text:"Beauty Fest 50% OFF - Lipstick" },
      { img:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80&auto=format&fit=crop", text:"Makeup Collection - Pinterest" },
      { img:"https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&q=80&auto=format&fit=crop", text:"Skincare - JioMart" },
      { img:"https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&q=80&auto=format&fit=crop", text:"Perfume - Amazon" },
      { img:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80&auto=format&fit=crop", text:"Hair Care" },
    ],
    icons: [
      { id:"lipstick", label:"Lipstick", emoji:"💄", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuF_n4JpR_HNPnP0bnspUwa2_KATCeq-0N2RUv_IQIrIGwozzxdtgjwWA&s=10" },
      { id:"makeup", label:"Makeup Kit", emoji:"🎨", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVUEv6xzkJ9w5n1W4Mn5wbnfg2-LEr5CjzFb2lDYTAD_XzYK83gHjjmzY&s=10" },
      { id:"skincare", label:"Skincare", emoji:"🧴", img:"https://www.health.com/thmb/adKY_XZ3apc1dqL9zczB0dwE9u0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Health-GettyImages-1251835366-a62b6cd334f648f4b7efe3b63fc1ac3c.jpg" },
      { id:"perfume", label:"Perfume", emoji:"🌸", img:"https://media.istockphoto.com/id/860801382/photo/perfume-spraying-on-purple-background.jpg?s=612x612&w=0&k=20&c=Iu8zrbZcyOiPSi9-Snq-LABgcAQWLIMv5xqQlyGlvMs=" },
      { id:"haircare", label:"Hair Care", emoji:"💇", img:"https://images.ctfassets.net/w62iilzqucuv/5feIzuhg8ywcsJHqvMASv5/08b85714ebbff0cc32d1fc645259c90f/new_ogx_lineup.webp?fm=jpg&w=1920&q=80" },
      { id:"nailpolish", label:"Nail Polish", emoji:"💅", img:"https://www.coloressence.com/cdn/shop/files/Gelato_e13606ba-9f6d-46d4-a0fd-28bd309ca800.jpg?v=1786951529" },
      { id:"facewash", label:"Face Wash", emoji:"🧼", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4CsSwMmJHkLstuAmuu66kwnakbTC37h0lb7SbBtEPIAw1hQ5HY-bcH5ij&s=10" },
      { id:"eyeliner", label:"Eyeliner", emoji:"👁️", img:"https://sanfe.in/cdn/shop/files/wink-eye-liner-with-stamp-p-1.jpg?v=1784881621&width=1000" },
      { id:"foundation", label:"Foundation", emoji:"🎨", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_wuzOMl3zLY_UcpNCebG1BTW9XLXWpml-95lWegFCNE4rDQ5zPgJEzDvH&s=10" },
      { id:"combos", label:"Combos", emoji:"🎁", img:"https://m.media-amazon.com/images/I/61tYHyCO9IL._SX569_.jpg" },
      { id:"serum", label:"Serum", emoji:"💧", img:"https://cdn.shopify.com/s/files/1/0712/2786/7410/t/5/assets/11118d4b12bc--07-3a0a1c.jpg?v=1736367448" },
    ],
  },
  electronics: {
    carousel: [
      { img:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&q=80&auto=format&fit=crop", text:"Laptops Sale - Amazon" },
      { img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80&auto=format&fit=crop", text:"Mobiles - Flipkart" },
      { img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80&auto=format&fit=crop", text:"Headphones" },
      { img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTroPXzQtKHJ-D17loW62jH9gvkeDsvC3u9gPMAMg_U6MuG0wq3y6P6TFM&s=10", text:"Smart Watches" },
      { img:"https://images.samsung.com/is/image/samsung/assets/in/tvs/tv-buying-guide/what-is-smart-tv/2023-tv-buying-guide-what-is-smart-tv-f00-mo.jpg?$720_N_JPG$", text:"TV & Appliances" },
    ],
    icons: [
      { id:"laptops", label:"Laptops", emoji:"💻", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Iv0HkL-wAPuJGeXAR0kWZgfcCxWkW2YzJDN5JmcYiNU7COoCJ3QxWyA&s=10" },
      { id:"mobiles", label:"Mobiles", emoji:"📱", img:"https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=500,fit=crop/YH5TbIXjaJb3GRxI/4deb0070c186156633bd7888d3b8337b-vEMvp8VXdJCFHq94.jpg" },
      { id:"watches", label:"Watches", emoji:"⌚", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhUsKowdRYmLUMm3LD8zH3xgKJ6LU3G-74W_ZhnylzPy67Cac8dWVUUVRD&s=10" },
      { id:"headphones", label:"Headphones", emoji:"🎧", img:"https://cdn.mos.cms.futurecdn.net/HMCWShKerkfeNQmYYhE3p7-1920-80.jpg" },
      { id:"tv", label:"TV", emoji:"📺", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHtxbD0b1OlI2xwLXFWy3VaHZFRn5xiNh7hh--VnDUMJGdZKhSAaHf3U3_&s=10" },
      { id:"fridge", label:"Fridge", emoji:"❄️", img:"https://5.imimg.com/data5/NJ/IH/BQ/SELLER-102166082/double-door-refrigerator-500x500.jpg" },
      { id:"keyboards", label:"Keyboards", emoji:"⌨️", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqnFmP6g83xiH-U9HOlhkZNAhAkxepKs0RIfsGohW2_gmb9TMqpRscnxo&s=10" },
      { id:"mouse", label:"Mouse", emoji:"🖱️", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Q6XdzeooanSk1tLjOKORUJX6BkAojk6-SyEvtcF2IvUvdBJXn_Zwma0K&s=10" },
    ],
  },
  furniture: {
    carousel: [
      { img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80&auto=format&fit=crop", text:"Furniture Sale 50% OFF" },
      { img:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80&auto=format&fit=crop", text:"Modern Sofa Collection" },
      { img:"https://www.greenply.com:5001/originalfile1768993285849-287.jpg", text:"Dining Tables" },
      { img:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80&auto=format&fit=crop", text:"Beds & Mattress" },
      { img:"https://images.unsplash.com/photo-1499933374294-4584851497cc?w=1200&q=80&auto=format&fit=crop", text:"Study Tables" },
    ],
    icons: [
      { id:"sofa", label:"Sofa", emoji:"🛋️", img:"https://cdn.shopify.com/s/files/1/0191/2234/products/1copy.jpg?v=1640110316" },
      { id:"chair", label:"Chair", emoji:"🪑", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8ecfJYPq4HAMLVTb9bUzsZSlA3ms3Oq8lKFZaANyQtf_ABREmxyR_EjnR&s=10" },
      { id:"table", label:"Table", emoji:"🪵", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrq70r2dPUyz6fnp6F4Eowyg2DvSTLq4dms_0T38iuLIP1ry9Ho2mm4TY&s=10" },
      { id:"bed", label:"Bed", emoji:"🛏️", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX6rK_YNydfgZ-0XuVfDeE3WRaiz8oYL9CZhDdA_EnItw8SxDJ1HGXOoaV&s=10" },
      { id:"wardrobe", label:"Wardrobe", emoji:"🚪", img:"https://assets.architecturaldigest.in/photos/6aac1e088c3181aaeed310ec/master/w_1600%2Cc_limit/hand%2520painted%2520floral%2520details.jpg" },
      { id:"dining", label:"Dining", emoji:"🍽️", img:"https://m.media-amazon.com/images/I/91+sSgNy3FL._AC_UF894,1000_QL80_.jpg" },
      { id:"decor", label:"Decor", emoji:"🪴", img:"https://img.magnific.com/free-photo/3d-rendering-flowers_23-2151281361.jpg?semt=ais_hybrid&w=740&q=80" },
      { id:"mattress", label:"Mattress", emoji:"🛌", img:"https://m.media-amazon.com/images/I/71mNX5yx5JL._AC_UF894,1000_QL80_.jpg" },
      { id:"photo-frames", label:"Photo Frames", emoji:"🖼️", img:"https://m.media-amazon.com/images/I/71gFpsnx-hL.jpg" },
      { id:"swing", label:"Swing", emoji:"🛝", img:"https://t4.ftcdn.net/jpg/00/80/16/15/360_F_80161502_fbdnbEZrJIghsWkD1MbqXlvrogufNUCt.jpg" },
      { id:"toys", label:"Toys", emoji:"🧸", img:"https://img.magnific.com/free-photo/cute-plush-toys-arrangement_23-2150312316.jpg?semt=ais_hybrid&w=740&q=80" },
    ],
  },
  fashion: {
    carousel: [
      { img:"https://images.squarespace-cdn.com/content/v1/5a1fac7e914e6b30d737146f/1699522559934-WFZW92TIBZFRVY90NPJY/Screenshot-2023-11-06-at-21.50.22.jpg", text:"Fashion Fest" },
      { img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80&auto=format&fit=crop", text:"Bags Collection" },
      { img:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200&q=80&auto=format&fit=crop", text:"Sunglasses" },
      { img:"https://img.kwcdn.com/product/fancy/7af037f4-b801-4be3-a63c-33603bcf45e7.jpg?imageView2/2/w/500/q/60/format/webp", text:"Footwear Fashion" },
      { img:"https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80&auto=format&fit=crop", text:"Jewellery Trending Fashion" },
    ],
    icons: [
      { id:"bags", label:"Bags", emoji:"👜", img:"https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
      { id:"sunglasses", label:"Sunglasses", emoji:"🕶️", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwq03ofH3L11dmoz6RiWCtFNt5KA_YiklRZt4mi7lZ9dvwfWfi2PCFMeps&s=10" },
      { id:"belts", label:"Belts", emoji:"🪢", img:"https://media.istockphoto.com/id/1029383076/photo/collection-of-leather-belts-on-a-wooden-table.jpg?s=612x612&w=0&k=20&c=wmTnklWIPJyRxpiooEVlwCewGGBq9LdxYbE8ijdxCkc=" },
      { id:"wallets", label:"Wallets", emoji:"👛", img:"https://t3.ftcdn.net/jpg/05/04/35/16/360_F_504351634_rPmAjifm2ypij1gM6JMDB2asUntTUVEX.jpg" },
      { id:"jewellery", label:"Jewellery", emoji:"💍", img:"https://png.pngtree.com/thumb_back/fh260/background/20241101/pngtree-indian-kundon-jewellery-image_16489015.jpg" },
      { id:"footwear", label:"Footwear", emoji:"👠", img:"https://thumbs.dreamstime.com/b/indian-footwear-2363258.jpg" },
      { id:"caps", label:"Caps", emoji:"🧢", img:"https://images.unsplash.com/photo-1777455163879-92852416eb36?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
      { id:"scarfs", label:"Scarves", emoji:"🧣", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTENDMUVNKLlCJj8a_pb8iCXBRU74hDmagiAo4NVrUf5neWFWfsodL21pve&s=10" },
      { id:"gloves", label:"Gloves", emoji:"🧤", img:"https://assets.myntassets.com/w_200,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2026/OCTOBER/13/a95c2161457f4bea9b3065c2bc9696c3.jpg" },
      { id:"ties", label:"Ties", emoji:"👔", img:"https://images.unsplash.com/photo-1591729652476-e7f587578d9c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
      { id:"socks", label:"Socks", emoji:"🧦", img:"https://media.istockphoto.com/id/1069111848/photo/a-pile-of-multi-colored-socks-view-from-above.jpg?s=612x612&w=0&k=20&c=l3sOQUwT7e_Dg5rweke0RTwWn5SJzMW8aVcknQ2ToLM=" },
      { id:"watches", label:"Watches", emoji:"⌚", img:"https://m.media-amazon.com/images/I/61P0vwN0Y+L._AC_UY350_.jpg" },
      { id:"hair-clips", label:"Hair Clips", emoji:"🎀", img:"https://i.etsystatic.com/66367593/r/il/e9c20a/8244188810/il_fullxfull.8244188810_i96v.jpg" },
    ],
  },
  sports: {
    carousel: [
      { img:"https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80&auto=format&fit=crop", text:"Sports 50% OFF" },
      { img:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1200&q=80&auto=format&fit=crop", text:"Shoes Collection" },
      { img:"https://static.owayo-cdn.com/newhp/img/magazin/trikotgeschichte/sportbekleidung-frueher-vs-heute-670.jpg", text:"Jersey" },
      { img:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80&auto=format&fit=crop", text:"Gym Equipments" },
      { img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzu3GCjYB4czWD8UNAh7PGMgjSug5H5fVNUHlOnUs9FID3dhgDrZ-0TpDC&s=10", text:"Sports Gear" },
    ],
    icons: [
      { id:"shoes", label:"Shoes", emoji:"👟", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ01yyAE1z9-dUYJaCzSrWvaTQTmWlgNJBcJqJToB4gCM_kt8ZSnVZGN7kp&s=10" },
      { id:"jersey", label:"Jersey", emoji:"👕", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnkIKQSpjLyBcVcs7UGDzibnFI2acjPcSTRA_8zvWCavUrPX5Ce3lMbck&s=10" },
      { id:"gym", label:"Gym", emoji:"🏋️", img:"https://img.magnific.com/free-photo/still-life-perfectly-ordered-fitness-gym-accessories_52683-100700.jpg?semt=ais_hybrid&w=740&q=80" },
      { id:"cricket", label:"Cricket", emoji:"🏏", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNqKAlp2fupvwA4fE5Ig0dUiK3qTm55P6YXIltqZJoWLjFz-QVEi81snAg&s=10" },
      { id:"football", label:"Football", emoji:"⚽", img:"https://thumbs.dreamstime.com/b/soccer-balls-red-yellow-blue-fill-metal-retail-basket-football-equipment-sale-sports-shop-concept-football-soccer-465702237.jpg" },
      { id:"badminton", label:"Badminton", emoji:"🏸", img:"https://5.imimg.com/data5/SELLER/Default/2025/3/493239134/GO/RU/VW/1326641/badminton-racket-500x500.jpeg" },
      { id:"cycle", label:"Cycle", emoji:"🚴", img:"https://m.media-amazon.com/images/I/619kR03KzbL._AC_UF1000,1000_QL80_.jpg" },
      { id:"hockey", label:"Hockey", emoji:"🏑", img:"https://thumbs.dreamstime.com/b/hockey-gear-placed-floor-training-area-various-equipment-including-skates-gloves-helmet-arranged-wooden-457630521.jpg" },
      { id:"skating", label:"Skating", emoji:"⛸️", img:"https://m.media-amazon.com/images/I/71w1EfaRGuL._AC_UF894,1000_QL80_.jpg" },
    ],
  },
};

const ORDER = ["home","grocery","clothes","electronics","beauty","fashion","sports","furniture"];
const FALLBACK_IMG = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80&auto=format&fit=crop";
const ICON_MAP = { "keyboard": "keyboards", "keyboards": "keyboards", "scarves": "scarfs", "scarfs": "scarfs", "scarf": "scarfs", "photo-frames": "photo-frames", "hair-clips": "hair-clips" };
const mapIcon = (id) => ICON_MAP[id] || id;

export default function CategoryPage(){
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat") || "grocery";
  const catData = ALL_DATA[cat] || ALL_DATA["grocery"];
  const [slide, setSlide] = useState(0);
  useEffect(()=>{ setSlide(0); }, [cat]);
  useEffect(()=>{ const t=setInterval(()=>setSlide(s=>(s+1)%catData.carousel.length), 3500); return ()=>clearInterval(t); }, [catData.carousel.length, cat]);
  const goHome = () => purpyGo(`/?view=home`);
  const goCat = (id) => id==="home" ? goHome() : purpyGo(`/?view=category&cat=${id}`);
  const goItems = (iconId) => purpyGo(`/?view=items&cat=${cat}&icon=${encodeURIComponent(mapIcon(iconId))}`);
  return (
    <div style={{maxWidth:"1200px", margin:"0 auto", background:"white"}}>
      <div style={{display:"flex", gap:"8px", overflowX:"auto", padding:"10px 12px", background:"#f8faf8", position:"sticky", top:0, zIndex:10, borderBottom:"1px solid #e5e7eb"}}>
        {ORDER.map(c=><button key={c} onClick={()=>goCat(c)} style={{flex:"0 0 auto", padding:"8px 16px", borderRadius:"20px", border:"1px solid #ddd", fontSize:"12px", fontWeight:700, cursor:"pointer", textTransform:"capitalize", background: c===cat ? "#2e7d32" : "white", color: c===cat ? "white" : "#333"}}>{c}</button>)}
      </div>
      <div style={{position:"relative", width:"100%", height:"clamp(340px, 58vw, 520px)", overflow:"hidden", background:"#000"}}>
        {catData.carousel.map((b,i)=><div key={i} style={{position:"absolute", inset:0, opacity:i===slide?1:0, transition:"opacity 0.7s", pointerEvents: i===slide ? "auto" : "none"}}><img src={b.img} onError={(e)=>{e.currentTarget.src=FALLBACK_IMG;}} style={{width:"100%", height:"100%", objectFit:"cover"}} alt="" /><div style={{position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(to top, rgba(0,0,0,0.7), transparent)", padding:"20px"}}><b style={{color:"white", background:"#2e7d32", padding:"12px 22px", borderRadius:"24px", fontSize:"18px", boxShadow:"0 4px 12px rgba(0,0,0,0.3)"}}>{b.text}</b></div></div>)}
        <div style={{position:"absolute", bottom:"18px", left:"50%", transform:"translateX(-50%)", display:"flex", gap:"8px"}}>
          {catData.carousel.map((_,i)=><div key={i} onClick={()=>setSlide(i)} style={{width:i===slide?"22px":"8px", height:"8px", borderRadius:"20px", background:i===slide?"white":"rgba(255,255,255,0.5)", cursor:"pointer", transition:"all 0.3s"}}></div>)}
        </div>
      </div>
      <div style={{background:"linear-gradient(to bottom, #ffffff, #f9fafb)", padding:"22px 12px"}}>
        <h3 style={{margin:"0 0 18px 0", fontSize:"16px", fontWeight:900, letterSpacing:"0.5px", color:"#111"}}>SHOP BY {cat.toUpperCase()} - {catData.icons.length} BEAUTIFUL ICONS</h3>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(132px, 1fr))", gap:"20px 14px"}}>
          {catData.icons.map(icon=>(
            <div key={icon.id} onClick={()=>goItems(icon.id)} style={{cursor:"pointer", textAlign:"center", transition:"transform 0.2s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
              <div style={{width:"100%", aspectRatio:"1", borderRadius:"26px", overflow:"hidden", background:"linear-gradient(135deg, #e8f5e9, #ffffff)", border:"3px solid transparent", backgroundImage:"linear-gradient(white, white), linear-gradient(135deg, #2e7d32, #81c784)", backgroundOrigin:"border-box", backgroundClip:"content-box, border-box", boxShadow:"0 8px 20px rgba(46,125,50,0.15)", padding:"4px"}}>
                <div style={{width:"100%", height:"100%", borderRadius:"20px", overflow:"hidden", background:"white"}}>
                  <img src={icon.img.includes("REPLACE") ? FALLBACK_IMG : icon.img} onError={(e)=>{e.currentTarget.src=FALLBACK_IMG;}} style={{width:"100%", height:"100%", objectFit:"cover"}} alt={icon.label} />
                </div>
              </div>
              <p style={{margin:"10px 0 0 0", fontSize:"13px", fontWeight:800, background:"linear-gradient(135deg, #2e7d32, #388e3c)", color:"white", padding:"7px 10px", borderRadius:"20px", boxShadow:"0 2px 8px rgba(46,125,50,0.2)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{icon.emoji} {icon.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}