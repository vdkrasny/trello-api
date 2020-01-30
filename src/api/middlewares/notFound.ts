import { Request, Response } from 'express';

import { HttpStatus } from '../../enums/HttpStatus';

export const notFound = (request: Request, response: Response): Response => {
    return response.status(HttpStatus.NotFound).json({
        error: { message: 'Endpoint not found!' },
    });
};

export default notFound;
