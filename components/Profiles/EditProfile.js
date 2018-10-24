import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  FadeAnimation
} from "react-native-popup-dialog";

const slideAnimation = new SlideAnimation({ slideFrom: "bottom" });
const scaleAnimation = new ScaleAnimation();
const fadeAnimation = new FadeAnimation({ animationDuration: 150 });


export default class EditProfile extends Component {


  state = {
      dialogShow: false
    };

  


  showScaleAnimationDialog = () => {
    this.scaleAnimationDialog.show();
  };
  
  //   showSlideAnimationDialog = () => {
  //     this.slideAnimationDialog.show();
  //   }

  showFadeAnimationDialog = () => {
    this.fadeAnimationDialog.show();
  } 
  
  render() {
      return (
        <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <DialogButton
            text="Game info"
            onPress={this.showScaleAnimationDialog}
          />
        </View>

        <PopupDialog
          ref={popupDialog => {
            this.scaleAnimationDialog = popupDialog;
          }}
          dialogAnimation={scaleAnimation}
          dialogTitle={<DialogTitle title="Popup Dialog - Scale Animation" />}
          actions={[
            <DialogButton
            text="DISMISS"
            onPress={() => {
              this.scaleAnimationDialog.dismiss();
            }}
            key="button-1"
            />
          ]}
          >
          <View style={styles.dialogContentView}>
            <DialogButton
              text="THIS IS OUR GAME INFORMATION/INSTRUCTIONS"
              onPress={this.showFadeAnimationDialog}
              />
          </View>
        </PopupDialog>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  dialogContentView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  navigationBar: {
    borderBottomColor: "#b5b5b5",
    borderBottomWidth: 0.5,
    backgroundColor: "#ffffff"
  },
  navigationTitle: {
    padding: 10
  },
  navigationButton: {
    padding: 10
  },
  navigationLeftButton: {
    paddingLeft: 20,
    paddingRight: 40
  },
  navigator: {
    flex: 1
    // backgroundColor: '#000000',
  }
});