import { Request, Response, NextFunction } from 'express'
import { AnyZodObject } from 'zod'

export const validateResource =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      })
      next()
    } catch (err: any) {
      next(err)
    }
  }
