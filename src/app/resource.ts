export class Resource  {
  id: number;
  name: string;
  params: {
    type: string;
    source: string;
    getFlag: boolean;
    postFlag: boolean;
    putFlag: boolean;
    delFlag: boolean;
  };
}
