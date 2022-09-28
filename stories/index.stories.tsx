import { useEffect, useState } from 'react';
import getSchemaTypes from '@/getSchemaTypes';
import { bSchema } from '@/test/bSchema';

const Component = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    console.log(bSchema);
    getSchemaTypes('//map-service:28080/graphql').then(res => {
      console.log(res);
      setData(res);
      return res;
    });
  }, []);

  return <div>{JSON.stringify(data)}</div>;
};

export const YourStory = () => <Component />;

export default {
  title: 'Your Stories',
};
