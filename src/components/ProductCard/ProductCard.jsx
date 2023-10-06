import React from 'react'
import { Button } from '../Button/Button'
import "./ProductCard.css"
import { Fieldset } from 'primereact/fieldset';

export const ProductCard = ({product, className, onAdd}) => {

  const onAddHandler = () => {
    onAdd(product)
  }

  return (
            <Fieldset legend="Header" toggleable className={'headerLegent'}>
                <div className={'product ' + className}>
                  <img src='image'></img>
                  <div className={'title'}>{product.title}</div>
                  <div className={'description'}>{product.description}</div>
                  <div className={'price'}>
                    <span>Цена: <b>{product.price}</b></span>
                  </div>
                  <Button className={'add-btn'} onClick={onAddHandler}>
                    Добавить в корзину
                  </Button>
                </div>
            </Fieldset>
    )
}
       
