import { StyleSheet, Dimensions } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 30,
  },

  // Header & Footer
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  questionDisplay: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  questionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  // Camera Controls
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 20,
  },
  captureButton: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "white",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
  },
  iconButton: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  // Zoom Slider
  zoomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  zoomSlider: {
    flex: 1,
    marginHorizontal: 10,
  },
  zoomText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },

  // General Button Style
  button: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "70%",
    overflow: "hidden",
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  buttonGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonIcon: {
    marginLeft: 10,
  },
  
  // Permission Screen
  permissionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  permissionText: {
    color: "#aaa",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  modalImageBackground: {
    flex: 1,
    backgroundColor: "black",
  },
  modalContentContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalHeader: {
    alignItems: "flex-start",
    padding: 20,
  },
  modalCloseButton: {
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
  },
  modalFooter: {
    padding: 30,
    alignItems: "center",
  },

  // Settings Bottom Sheet
  sheetOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheetContainer: {
    backgroundColor: "#1E1E1E",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    maxHeight: screenHeight * 0.6,
  },
  sheetHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#444",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 15,
  },
  sheetTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sheetOption: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  sheetOptionText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export { styles };