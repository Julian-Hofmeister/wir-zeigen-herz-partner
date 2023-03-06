import {Category} from './categories';

export interface Partner {
  name: string;
  logoImg: string;
  linkDE?: string;
  linkAT?: string;
  linkCH?: string;
  linkWW?: string;
  category: Category | string;
  categoryId: string;
}
