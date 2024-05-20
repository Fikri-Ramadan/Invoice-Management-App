'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Asterisk, CopyPlus, Trash2 } from 'lucide-react';

type Props = {
  products: any;
  data: any;
  setData: any;
};

export default function MultiProductField({ products, data, setData }: Props) {
  const handleClick = () => {
    setData([...data, { id: '', name: '', quantity: 0, price: 0 }]);
  };

  const handleChange = (e: any, i: number) => {
    const { name, value } = e.target;
    const onchangeVal: any = [...data];
    onchangeVal[i][name] = value;
    setData(onchangeVal);
  };

  const handleChangeSelect = (indexProduct: any, i: number) => {
    const product = products[indexProduct];
    const onChangeVal: any = [...data];
    onChangeVal[i].id = product?.id;
    onChangeVal[i].name = product?.name;
    onChangeVal[i].price = product?.price;
    setData(onChangeVal);
  };

  const handleDelete = (i: number) => {
    const deleteVal = [...data];
    deleteVal.splice(i, 1);
    setData(deleteVal);
  };

  return (
    <div className="space-y-2">
      <div className="mb-2 font-semibold flex items-center">
        Product <Asterisk className="text-red-500 w-4 h-4" />
      </div>
      {data.map((val: any, i: number) => {
        return (
          <div key={i} className="flex items-center gap-2">
            <Select
              onValueChange={(value) => {
                handleChangeSelect(value, i);
              }}
            >
              <SelectTrigger className="w-1/4 border-slate-300 border-2">
                <SelectValue placeholder="Choose a Product" />
              </SelectTrigger>
              <SelectContent className="max-h-[400px]">
                {products?.map((product: any, i: number) => {
                  return (
                    <SelectItem
                      key={i}
                      // value={`${product?.id}-${product?.price}`}
                      value={`${i}`}
                    >
                      {product?.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <div className="w-1/4 flex items-center gap-2">
              <Input
                name="quantity"
                type="number"
                min={1}
                value={val.quantity}
                onChange={(e) => handleChange(e, i)}
                className="border-slate-500"
              />
              <Button
                variant={'destructive'}
                onClick={() => handleDelete(i)}
                type="button"
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        );
      })}
      <Button
        variant={'outline'}
        onClick={handleClick}
        type="button"
        className="w-1/2"
      >
        <CopyPlus className="text-green-400" />
      </Button>
    </div>
  );
}
