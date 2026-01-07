export interface Courier {
  id: number;
  name: string;        //

  /** backend réel */
  first_name: string;
  last_name: string;
  email: string;
  phone: string;

  created_at?: string;
  updated_at?: string;
}
