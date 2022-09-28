import { gql } from '@pakwoon/graphql-client';

export const bSchema = gql`
  fragment comp on MonitorPanelConfigAttr {
    idOrg
    idMonitorPanelConfigAttr
  }

  query listMonitorPanelConfig {
    listMonitorPanelConfig {
      idMonitorPanelConfig
      syMvcc
      configAttr {
        ...comp
      }
    }
  }
`;
