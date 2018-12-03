import React, { Component } from 'react'
import { Button, FlatList, Image, TouchableOpacity, View, CameraRoll, GetPhotosReturnType, Text, ImageBackground } from 'react-native'
import ImagePicker, { Image as Photo } from 'react-native-image-crop-picker'
import { PhotoItemPerRow, width, height, PreviewItemCount, noImage } from './const'

type Props = {
  disabled: boolean
}

type PhotoEdge = GetPhotosReturnType['edges'][0]
type PhotoNode = PhotoEdge['node']

interface State {
  preLoaded: PhotoNode[]
  selected: Photo[]
}

export class ReviewManager extends Component<Props, State> {
  state: State = {
    preLoaded: [],
    selected: [],
  }

  openCropper = async (item: Photo) => {
    const photo = await ImagePicker.openCropper({
      path: item.path,
      width,
      height,
    })

    console.log(`phtoo -> `, photo)

    // if (photo) {
    //   const preLoaded = this.state.preLoaded.findIndex(item => item.image.uri === photo.data)
    //   const selected = this.state.selected.findIndex(item => item.data === photo.data)
    //   this.setState({
    //     preLoaded,
    //     selected,
    //   })
    // }
  }

  renderItem = ({ item, index }) => {
    const showImagePreview = index + 1 < PreviewItemCount.Review

    return showImagePreview ? (
      <TouchableOpacity onPress={() => {}} activeOpacity={1}>
        <Image
          style={{ width, height }}
          source={{ width, height, uri: item.image.uri }}
        />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={this.openImagePicker}>
        <ImageBackground source={{ uri: noImage }} style={{ width, height, backgroundColor: 'lightgrey' }}>
          <Text>Open From Album</Text>
        </ImageBackground>
      </TouchableOpacity>
    )
  }

  openImagePicker = async () => {
    try {
      const photos = (await ImagePicker.openPicker({
        width,
        height,
        multiple: true,
        maxFiles: 1000,
      })) as Photo[]

      // TODO: photo 인터페이스를 공통으로 뽑아내야 함
      // 기존에 있는 아이템 중, 선택이 안된 사진을 제거하고, 새로 선택한 사진을 리스트에 추가해야 함?
      if (!!photos) {

        this.setState({
          // photos,
        })
      }
    } catch (e) {}
  }

  getPhotos = async (first: number = 20) => {
    try {
      const results: GetPhotosReturnType = await CameraRoll.getPhotos({
        first,
        assetType: 'Photos',
      })

      return results.edges.map(edge => edge.node)
    } catch (err) {
      console.log(`error... `, err)
    }
  }

  async componentDidMount() {
    const photos = await this.getPhotos(PreviewItemCount.Review) || []

    this.setState({
      preLoaded: photos
    })
  }

  render() {
    if (this.props.disabled) {
      return null
    }

    return (
      <View style={{ flex: 10, backgroundColor: 'white' }}>
        <Text style={{ flex: 1, textAlign: 'center', fontSize: 20 }}>Review Content Area</Text>
        <FlatList
          style={{ flex: 1 }}
          data={this.state.preLoaded}
          keyExtractor={(_, index) => `${index}`}
          numColumns={PhotoItemPerRow.Review}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}