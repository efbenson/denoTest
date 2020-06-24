import { Product } from '../types.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts'


let products: Product[] = [
    {
        id: '1',
        name: 'product one',
        description: 'product one descr',
        price: 123
    },
    {
        id: '2',
        name: 'product two',
        description: 'product two descr',
        price: 345.20
    }
]

const getProducts = ({ response } : { response: any }) => {
    response.body = {
        success: true,
        data: products
    }
}

const getProductById = ({ params, response } : { params: {id: string }, response: any }) => {
    const product : Product | undefined  = products.find(p => p.id === params.id);
    
    if (!product) {
        response.status = 404
        response.body = {
            success: false,
            message: 'Not found'
        }

        return;
    }

    response.status = 200
    response.body = {
        success: true,
        data: product
    }

    return;
}

const addProduct = async ({ request, response } : { request: any, response: any }) => {
    const body = await request.body();

    if (!request.hasBody) {
        response.status = 400
        response.body = {
            success: false,
            message: 'No Data'
        }
        return;    
    }

    const product = body.value;
    product.id = v4.generate();
    products.push(product);
    response.status = 201;
    response.body = {
        success: true,
        data: product
    }

}

const updateProduct = async ({ params, request, response } : { params: {id: string}, request: any, response: any }) => {
    const product : Product | undefined  = products.find(p => p.id === params.id);
    if (!product) {
        response.status = 404
        response.body = {
            success: false,
            message: 'Not found'
        }

        return;
    }

    const body = await request.body();

    if (!request.hasBody) {
        response.status = 400
        response.body = {
            success: false,
            message: 'No Data'
        }
        return;    
    }

    const updateData : Product = body.value;
    products = products.map(p => p.id === params.id ? { ...p, ...updateData} : p);

    response.status = 200
    response.body = {
        success: true,
        data: products.find(p => p.id === params.id)
    }
    return;    

}

const deleteProduct = ({ response, params } : { params: {id: string}, response: any }) => {
    products = products.filter(p => p.id !== params.id);
    response.body = {
        success: true,
        message: `Product ${params.id} removed`
    }
}


export { getProducts, getProductById, addProduct, updateProduct, deleteProduct };