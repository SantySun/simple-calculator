import React, { useEffect, useState } from "react"
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native"
import { Icon } from "react-native-elements"
import Button from "./Button"
import _ from "lodash"

interface NumberPadProp {
  onExpressionChange: (expression: string) => void
}

const NumberPad: React.FC<NumberPadProp> = ({ onExpressionChange }) => {
  const buttons: Array<string> = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    ".",
    // "+",
    // "-",
    "*",
    // "/",
    "DEL"
  ]

  const [expression, setExpression] = useState<string>("")

  useEffect(() => {
    onExpressionChange(expression)
  }, [expression])

  const onButtonPress = (item: string) => {
    if (item === "DEL") {
      setExpression(expression.slice(0, -1))
    } else if (item === "*" || item === "/" || item === "+" || item === "-") {
      setExpression(expression + item)
    } else if (item === ".") {
      if (_.last(expression.split("*")) === "") {
        setExpression(expression + "0" + item)
      } else {
        setExpression(expression + item)
      }
    } else {
      setExpression(expression + item)
    }
  }

  const buttonEnabled = (item: string) => {
    if (item.match(/[1-9]/)) {
      return _.last(expression.split("*")) !== "0"
    } else if (item === "DEL") {
      return expression.length >= 1
    } else if (item === "0") {
      return _.last(expression.split("*")) !== "0"
    } else if (item === "*") {
      return (
        _.last(expression.split("*")) !== "" &&
        _.last(_.last(expression.split("*"))) !== "."
      )
    } else if (item === ".") {
      return !_.last(expression.split("*"))?.includes(".")
    }
  }

  return (
    <View style={styles.conatiner}>
      <FlatList
        data={buttons}
        style={styles.buttons}
        keyExtractor={(item: string) => item}
        scrollEnabled={false}
        numColumns={3}
        renderItem={({ item }: { item: string }) => (
          <Button
            disabled={!buttonEnabled(item)}
            title={item}
            onPress={() => {
              onButtonPress(item)
            }}
          />
        )}
      />
    </View>
  )
}

export default NumberPad

const styles = StyleSheet.create({
  conatiner: {
    padding: 0.5,
    backgroundColor: "#eee",
    margin: 5,
    borderRadius: 10,
  },
  buttons: {
    marginBottom: 0
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "lightgrey",
    paddingVertical: 20
  }
})
