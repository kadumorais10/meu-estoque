import { Request, Response } from "express";
import { productService } from "../services/ProductsService";

class ProductController {
  async create(req: Request, res: Response) {
  try {
    const {
      name,
      sku,
      description,
      price,
      quantity,
      min_quantity
    } = req.body;

    const product = await productService.createProduct(
      name,
      sku,
      description,
      Number(price),
      Number(quantity),
      Number(min_quantity)
    );

    res.status(201).json(product);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}


  async getAll(req: Request, res: Response) {
    const products = await productService.getAllProducts();
    res.json(products);
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(Number(id));
      res.json(product);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const  {
      name,
      description,
      price,
      quantity,
      min_quantity,
    } = req.body;
      const product = await productService.updateProduct(Number(id), { name,
      description,
      price: price !== undefined ? Number(price) : undefined,
      quantity: quantity !== undefined ? Number(quantity) : undefined,
      min_quantity: min_quantity !== undefined ? Number(min_quantity) : undefined,} );
      res.json(product);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await productService.deleteProduct(Number(id));
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

export const productController = new ProductController();
