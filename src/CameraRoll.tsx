import React, { Component } from 'react'
import { Button, FlatList, Image, TouchableOpacity, View } from 'react-native'
import ImagePicker, { Image as Photo } from 'react-native-image-crop-picker'
import { PhotoItemPerRow, width, height } from './const'

type Props = {
  disabled: boolean
}

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

    if (photo) {
      this.setState({
        photo,
      })
    }
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
        maxFiles: 1000,
      }) as Photo

      if (!!photos) {
        this.setState({
          photo: photos,
        })
      }
    } catch (e) {}
  }

  render() {
    if (this.props.disabled) {
      return null
    }

    return (
      <View style={{ flex: 10 }}>
        <Button
          title="It's Camera Icon :)"
          onPress={this.loadCameraManager}
        />
        {this.state.photo && this.renderItem({ item: this.state.photo })}
        {/* <FlatList
          data={this.state.photos}
          keyExtractor={(_, index) => `${index}`}
          numColumns={PhotoItemPerRow.CameraRoll}
          renderItem={this.renderItem}
          removeClippedSubviews={true}
        /> */}
      </View>
    )
  }
}
