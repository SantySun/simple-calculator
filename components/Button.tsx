import React from "react"
import { Text, StyleSheet, TouchableOpacity } from "react-native"
import { Icon } from "react-native-elements"

interface ButtonProp {
  title: string | React.ReactNode
  onPress: () => void
  disabled: boolean
}

const Button: React.FC<ButtonProp> = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        { backgroundColor: disabled ? "lightgrey" : "grey" }
      ]}
    >
      {title === "DEL" ? (
        <Icon name="backspace" color={disabled ? "grey" : "#222200"} size={36}/>
      ) : (
        <Text style={[styles.text, { color: disabled ? "grey" : "#222200" }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default Button
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    // borderColor: "lightgrey",
    paddingVertical: 20,
    borderRadius: 5,
    margin: 3
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#222200"
  }
})
