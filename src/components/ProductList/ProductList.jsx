import React, { useState, useCallback, useEffect } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import { ProductCard } from '../ProductCard/ProductCard'
import { ModalDelete } from '../Modals/ModalDelete';
import './ProductList.css'

const products = [
  {id: '1', price: 350000000, description: "Летает, не бит не крашен", image: "https://bizavnews.ru/upload/iblock/1b6/qk5l7op4qfidczel5bo2m4e7r20tom41/HX50_Skids.jpg"},
  {id: '2', price: 450000000, description: "Летала девушка, один хозяин", image: "https://pics.utro.ru/utro_photos/2017/06/23/1331430.jpg"},
  {id: '3', price: 550000000, description: "Летал только в выходные", image: "https://s9.travelask.ru/uploads/post/000/028/636/main_image/facebook-4c6ed91805b7d16a08cc0fa2a5a02d9e.jpg"},
  {id: '4', price: 650000000, description: "Заливали только ракетное топливо", image: "https://p.turbosquid.com/ts-thumb/PC/mo5EYC/3QPQa8G2/p1/jpg/1560150243/600x600/fit_q87/3de69cceaa359df8e21fe19d8404d549e0d7014b/p1.jpg"},
  {id: '5', price: 750000000, description: "Обмен на квартиру", image: "https://p.turbosquid.com/ts-thumb/Gt/2xCqXv/s1POj5pr/2main/jpg/1447517033/600x600/fit_q87/8b338a54773b3b3b44207d621a72c446eb6c43c0/2main.jpg"},
  {id: '6', price: 850000000, description: "Продам гараж, в подарок вертолет", image: "https://cs14.pikabu.ru/post_img/big/2023/06/02/9/168571694816454484.jpg"},
  {id: '7', price: 450000000, description: "Cостояние рабочее, сел и полетел", image: "https://img.freepik.com/premium-photo/military-and-civillian-helicopter-of-the-future-in-motion-in-a-futuristic-style-on-the-background-of-the-urban-landscape-new-technologies-cyberpunk-high-resolution-art-artificial-intelligence_399089-6909.jpg"},
  {id: '8', price: 450000000, description: "Летадла пушка", image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e36b69a2-a218-4f43-97c0-dd316a21c699/dfv5jwb-96029de2-2af5-44b3-8b25-54e2c9efc5f2.jpg/v1/fill/w_768,h_768,q_75,strp/futuristic_sci_fi_helicopter_by_pickgameru_dfv5jwb-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzY4IiwicGF0aCI6IlwvZlwvZTM2YjY5YTItYTIxOC00ZjQzLTk3YzAtZGQzMTZhMjFjNjk5XC9kZnY1andiLTk2MDI5ZGUyLTJhZjUtNDRiMy04YjI1LTU0ZTJjOWVmYzVmMi5qcGciLCJ3aWR0aCI6Ijw9NzY4In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.lWW05Agd0jPZ9jQTfy4G1FYOj5qqXWsZEIVaSD2DvVE"},

]
const getTotalPrice = (items) => {
  return items.reduce((acc, item) => {
    return acc += item.price
  }, 0)
}

export const ProductList = () => {


  const { tg, queryId } = useTelegram()
  const [addedItems, setAddedItems] = useState([])

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId
    }

      fetch('https://whispering-harbor-13560.herokuapp.com/web-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
  }, [addedItems, queryId])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [tg, onSendData])

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find(item => item.id === product.id)
    let newItems = []

    if (alreadyAdded) {
      newItems = addedItems.filter(item => item.id !== product.id)
    } else {
      newItems = [...addedItems, product]
    }

    setAddedItems(newItems)

    if (newItems.length === 0) {
      tg.MainButton.hide()
    }
    else {
      tg.MainButton.show()
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`
      })
    }
  }

  const onDelete = (productId) => {
    const newItems = addedItems.filter(item => item.id !== productId);
    setAddedItems(newItems);
  
    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`
      });
    }
  };

  return (
    <div className={'list'}>
        {products.map(item => (
          <ProductCard
            key={item.id}
            product={item}
            onAdd={onAdd}
            onDelete={() => onDelete(item.id)}  
            className={'item'}
          />
         ))}
    </div>
  );
};

