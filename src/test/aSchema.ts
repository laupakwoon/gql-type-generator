import { gql } from '@pakwoon/graphql-client';

export const aSchema = gql`
  query listDeploymentPosition($queryKey: String, $ids: [Long]) {
    listDeploymentPosition(params: { ids: $ids, queryKey: $queryKey }) {
      idDeploymentPosition
      idTent
      idOrg
      syIdUserCreate
      syNaUserCreate
      syDtCreate
      syIdUserUpdate
      syNaUserUpdate
      syDtUpdate
      syMvcc
      productName
      releaseVersion
      releaseDate
      department
      employee
      customerName
      idProv
      naProv
      idCity
      naCity
      idArea
      naArea
      address
      contactName
      contactPhone
      coordinate
      remark
    }
  }
`;
