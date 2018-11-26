import { Dimensions } from 'react-native'

export enum PhotoItemPerRow {
  CameraRoll = 3,
}

const itemDimension = Dimensions.get('window').width / PhotoItemPerRow.CameraRoll

export const width = itemDimension
export const height = itemDimension
