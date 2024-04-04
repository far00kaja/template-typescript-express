import { Response } from "express";

type ResponseInterface = {
  status: number;
  message: string;
  current_page?: number | null;
  total_page?: number | null;
  data?: any;
  error?: any;
};

interface ResponsePaginateInterface {
  currentPage: number | null;
  totalPage: number | null
}

export default (res: Response, statusCode: number, message: string, paginate: ResponsePaginateInterface | null, result: any) => {
  const response: ResponseInterface = {
    status: statusCode === 200 || statusCode === 201 ? 1 : 0,
    message: message,
  };

  if (paginate != null) {
    response.current_page = paginate.currentPage;
    response.total_page = paginate.totalPage;
  }

  if (result !== null) {
    if (response.status === 1) {
      response.data = result;
    } else {
      response.error = result;
    }
  }

  res.status(statusCode).json(response);
};
