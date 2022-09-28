// import path from 'path';
import fs from 'fs';
import { gql } from '@pakwoon/graphql-client';
import { toUppercaseFirstLetter } from '@pakwoon/utils';
import type { SSRecord } from '@pakwoon/utils';
import getSchemaTypes from './getSchemaTypes';
import type { TTypes, TObject } from './getSchemaTypes';

const nativeType: SSRecord = {
  Int: 'number',
  Float: 'number',
  String: 'string',
  Boolean: 'boolean',
  ID: 'number',
};

// TODO: 后续改为传入配置
const scalarType: SSRecord = {
  BigDecimal: 'number',
  Boolean: 'boolean',
  Date: 'string',
  DateTime: 'string',
  Float: 'number',
  Int: 'number',
  Long: 'number',
  MetricInfo: 'record<string, string>',
  String: 'string',
  Time: 'string',
  Upload: 'any',
  _FieldSet: 'any',
};

const getTypeAndDesc = (types: TTypes, oriType: string, obj?: any) => {
  let tsType = '';
  let tsDesc = '';
  if (nativeType[oriType] || scalarType[oriType]) {
    tsType = nativeType[oriType] || scalarType[oriType];
  } else if (types[oriType]) {
    const data = types[oriType];
    if (data.desc) {
      tsDesc = `/** ${data.desc} */`;
    }
    if (data.type === 'enum') {
      tsType = data.value;
    }
    if (data.type === 'object') {
      const props = Object.entries(data.props)
        .filter(([key]) => {
          if (!obj) {
            return true;
          }
          if (obj.selectionSet?.selections?.length) {
            return obj.selectionSet.selections
              .map((selection: any) => selection.name.value)
              .includes(key);
          }
          return false;
        })
        .reduce((str, [key, value]) => {
          let subObj = false;
          if (obj) {
            subObj = obj.selectionSet.selections.find(
              (selection: any) => selection.name.value === key,
            );
          }
          let desc = '';
          if (value.desc) {
            desc = `/** ${value.desc} */`;
          }

          const { tsType } = getTypeAndDesc(types, value.value, subObj);
          const _arr = tsType === 'unknown' ? '' : value.arr;
          const _str = `
            ${str}
            ${desc}
            ${key}: ${tsType}${_arr}`;
          return _str;
        }, '');
      if (props) {
        tsType = `{
            ${props}
          }`;
      } else {
        tsType = 'unknown';
      }
    }
  } else {
    tsType = 'unknown';
  }
  return {
    tsType,
    tsDesc,
  };
};

const generatorTypeContent = async (filePath: string, serverPath: string) => {
  const types = await getSchemaTypes(serverPath);

  // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  // const content = require(path.resolve(path.resolve('.'), filePath));

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const extractContent = fileContent.match(
    /\w* = gql`(\r\n|\n| |\w|\(|\)|\$|:|,|\[|\]|\{|\}|!)*`/g,
  );
  let content = '';
  if (extractContent) {
    extractContent.forEach((item: string) => {
      const varName = item.split(' ')[0];
      const schema = item.replace(`${varName} = gql`, '').replace(/`/g, '');
      const obj = gql(schema);

      obj.definitions.forEach(definition => {
        // query & mutation
        if (definition.kind === 'OperationDefinition') {
          const methodName = toUppercaseFirstLetter(
            definition.name?.value as string,
          );
          if (definition.variableDefinitions?.length) {
            // 入参
            content += `
              export type T${methodName}Params = {
                ${definition.variableDefinitions?.reduce(
                  (str, variableDefinition) => {
                    const propName = variableDefinition.variable.name.value;
                    let type = '';
                    let arr = '';
                    switch (variableDefinition.type.kind) {
                      case 'NamedType':
                        type = variableDefinition.type.name.value;
                        break;
                      case 'ListType': {
                        const setTypeAndArr = (obj: any) => {
                          if (obj.type.kind === 'ListType') {
                            arr = `${arr}[]`;
                            setTypeAndArr(obj.type);
                          } else if (obj.type.kind === 'NamedType') {
                            type = obj.type.name.value;
                          }
                        };
                        setTypeAndArr(variableDefinition);
                        break;
                      }
                      default:
                        break;
                    }

                    const { tsType, tsDesc } = getTypeAndDesc(types, type);
                    if (tsDesc) {
                      return `
                      ${str}
                      ${tsDesc}
                      ${propName}:${tsType}${arr};`;
                    } else {
                      return `
                      ${str}
                      ${propName}:${tsType}${arr};`;
                    }
                  },
                  '',
                )}
              }
            `;
          }

          const operation = toUppercaseFirstLetter(definition.operation);
          // 出参
          content += `
            export type T${methodName}Res = {
              ${definition.selectionSet.selections.reduce((str, selection) => {
                let propsName = '';
                if (selection.kind === 'Field') {
                  propsName = selection.name.value;
                }
                const { arr, value } = (types[operation] as TObject).props[
                  propsName
                ];

                const { tsType, tsDesc } = getTypeAndDesc(
                  types,
                  value,
                  selection,
                );
                let _str = '';
                const _arr = tsType === 'unknown' ? '' : arr;
                if (tsDesc) {
                  _str = `
                    ${str}
                    ${tsDesc}
                    ${propsName}: ${tsType}${_arr};
                  `;
                } else {
                  _str = `
                    ${str}
                    ${propsName}: ${tsType}${_arr};
                  `;
                }
                return _str;
              }, '')}
            }
          `;
        }
      });
    });
  }
  return content;
};

export default generatorTypeContent;
