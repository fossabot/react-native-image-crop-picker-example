import React, { Component } from 'react'
import { Button, FlatList, Image, TouchableOpacity, View } from 'react-native'
import ImagePicker, { Image as Photo } from 'react-native-image-crop-picker'
import { PhotoItemPerRow, width, height } from './const'

type Props = {}

interface State {
  photo?: Photo
  photos: Photo[]
}

export class CameraManager extends Component<Props, State> {
  state: State = {
    photos: [],
  }

  openCropper = async (item: Photo) => {
    const photo = await ImagePicker.openCropper({
      path: item.path,
      width,
      height,
    })

    this.setState({
      photo,
    })
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.openCropper(item)}>
        <Image
          style={{ width, height }}
          source={{ width, height, uri: item.path }}
        />
      </TouchableOpacity>
    )
  }

  loadCameraManager = async () => {
    try {
      const photos = await ImagePicker.openPicker({
        width,
        height,
        multiple: true,
        maxFiles: 1000,
      }) as Photo[]

      this.setState({
        photos,
      })
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <>
        <Button
          title="Load Camera Roll's Image"
          onPress={this.loadCameraManager}
        />
        { this.state.photo && (
          <View style={{ width: '100%', height: 100 }}>
            <Image source={{ uri: this.state.photo.path, width, height }} />
          </View>
        )}
        <FlatList
          data={this.state.photos}
          keyExtractor={(_, index) => `${index}`}
          numColumns={PhotoItemPerRow.CameraRoll}
          renderItem={this.renderItem}
          removeClippedSubviews={true}
        />
      </>
    )
  }
}
