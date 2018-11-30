import { Dimensions } from 'react-native'

export enum PhotoItemPerRow {
  CameraRoll = 3,
  Review = 3,
}

export enum PreviewItemCount {
  Review = PhotoItemPerRow.Review * 5
}

const itemDimension = Dimensions.get('window').width / PhotoItemPerRow.CameraRoll

export const width = itemDimension
export const height = itemDimension
