import { gql } from '@pakwoon/graphql-client';

export const QUERY_LIST_AREA = gql`
  query listArea($queryKey: String, $idPar: Long) {
    listArea(
      params: { queryKey: $queryKey, eusActiveStatus: [1], idPar: $idPar }
    ) {
      idArea
      cd
      na
      des
      idPar
      treePath
      treeLevel
      fgLeaf
      euActiveStatus
      syIdUserCreate
      syNaUserCreate
      syDtCreate
      syIdUserUpdate
      syNaUserUpdate
      syDtUpdate
      syMvcc
    }
  }
`;

export const QUERY_LIST_POSITION = gql`
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

export const MUTATION_CREATE_POSITION = gql`
  mutation createDeploymentPosition(
    $deploymentPosition: CreatedeploymentPositionInput
  ) {
    createDeploymentPosition(deploymentPosition: $deploymentPosition)
  }
`;

export const MUTATION_UPDATE_POSITION = gql`
  mutation updateDeploymentPosition(
    $idDeploymentPosition: Long
    $syMvcc: Int
    $deploymentPosition: UpdatedeploymentPositionInput
  ) {
    updateDeploymentPosition(
      idDeploymentPosition: $idDeploymentPosition
      syMvcc: $syMvcc
      deploymentPosition: $deploymentPosition
    )
  }
`;

export const QUERY_POSITION_DETAIL = gql`
  query getDeploymentPosition($idDeploymentPosition: Int) {
    getDeploymentPosition(idDeploymentPosition: $idDeploymentPosition) {
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

export const QUERY_POSITION_SUMMARY = gql`
  query getPositionSummary {
    getPositionSummary {
      totalCount
      summaryGroup {
        productName
        positionCount
      }
    }
  }
`;

export const MUTATION_DELETE_POSITION = gql`
  mutation deleteDeploymentPosition($idDeploymentPosition: Long) {
    deleteDeploymentPosition(idDeploymentPosition: $idDeploymentPosition)
  }
`;
