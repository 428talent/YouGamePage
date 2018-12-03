import { AxiosError, AxiosResponse } from 'axios';
import { Api } from '../config/api';
import { apiRequest } from '../utils/request';
import { WishListItem } from './model/wishlist';

export function fetchWishList({ option }): Promise<AxiosResponse<WishListItem>> {
  return apiRequest({
    url: Api.getWishListItems,
    method: 'get',
    queryParams: option,
    page: option.page,
  });
}

export function deleteWishListItems({ option }): Promise<AxiosResponse<any>> {
  return apiRequest({
    data: {
      ...option,
    },
    method: 'delete',
    url: Api.deleteWishlistItems,
  });
}
