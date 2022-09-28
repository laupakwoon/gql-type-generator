import { SRecord } from '@pakwoon/utils';
import axios from 'axios';

type TProps = SRecord<{ desc: string; value: string; arr: string }>;

export type TEnum = {
  type: 'enum';
  desc: string;
  value: string;
};

export type TObject = {
  type: 'object';
  desc: string;
  props: TProps;
};

export type TTypes = SRecord<TEnum | TObject>;

const getSchemaTypes = async (serverPath: string) => {
  const types: TTypes = {};
  const res = await axios({
    url: serverPath,
    method: 'POST',
    data: {
      operationName: 'IntrospectionQuery',
      query:
        '\n    query IntrospectionQuery {\n      __schema {\n        description\n        queryType { name }\n        mutationType { name }\n        subscriptionType { name }\n        types {\n          ...FullType\n        }\n        directives {\n          name\n          description\n          \n          locations\n          args {\n            ...InputValue\n          }\n        }\n      }\n    }\n\n    fragment FullType on __Type {\n      kind\n      name\n      description\n      \n      fields(includeDeprecated: true) {\n        name\n        description\n        args {\n          ...InputValue\n        }\n        type {\n          ...TypeRef\n        }\n        isDeprecated\n        deprecationReason\n      }\n      inputFields {\n        ...InputValue\n      }\n      interfaces {\n        ...TypeRef\n      }\n      enumValues(includeDeprecated: true) {\n        name\n        description\n        isDeprecated\n        deprecationReason\n      }\n      possibleTypes {\n        ...TypeRef\n      }\n    }\n\n    fragment InputValue on __InputValue {\n      name\n      description\n      type { ...TypeRef }\n      defaultValue\n      \n      \n    }\n\n    fragment TypeRef on __Type {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n                ofType {\n                  kind\n                  name\n                  ofType {\n                    kind\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ',
    },
  });
  res.data.data.__schema.types.forEach((item: any) => {
    const { name } = item;
    switch (item.kind) {
      case 'ENUM':
        types[name] = {
          type: 'enum',
          desc: item.description || '',
          value: item.enumValues
            .map(({ name }: { name: string }) => `'${name}'`)
            .join('|'),
        };
        break;
      case 'INPUT_OBJECT':
      case 'OBJECT': {
        const props: TProps = {};
        const fields = item.fields || item.inputFields || [];
        fields.forEach((field: any) => {
          let value = field.type.name;
          let arr = '';
          if (field.type.kind === 'LIST') {
            value = field.type.ofType.name;
            arr = '[]';
          }
          props[field.name] = {
            desc: field.description,
            value,
            arr,
          };
        });
        types[name] = {
          type: 'object',
          desc: item.description || '',
          props,
        };
        break;
      }
      default:
        break;
    }
  });

  return types;
};

export default getSchemaTypes;
